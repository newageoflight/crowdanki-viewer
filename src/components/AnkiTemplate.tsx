import React from 'react'
import Mustache from "mustache";

import { NoteInterface } from '../interfaces/NoteInterface';
import { CardTemplateInterface } from './../interfaces/CardTemplate';
import { NoteModel } from './../interfaces/NoteModel';
import { range, zip } from './../utils/utils';
import { FlipCard } from './FlipCard';

// this file helps render Anki card templates as React Components
// ports (some of) the template.py file in the Anki source code
// Read here for how to reverse engineer Anki's db:
// https://www.juliensobczak.com/write/2016/12/26/anki-scripting.html

// I finally found out how to redirect the image folder
// https://stackoverflow.com/questions/53014651/is-it-possible-to-serve-static-files-with-create-react-app-from-public-folder

// turn off escaping in mustache
Mustache.escape = function (value) {
    return value;
}

interface Props {
    note: NoteInterface;
    model: NoteModel;
    template: CardTemplateInterface;
}

interface LabelledTags {
    name: string;
    type: string;
    raw: string;
}

interface ClozeItem {
    content: string;
    hint: string;
    raw: string;
}

// const templateSectionRe = /\{\{[#|^]([^}]*)\}\}(.+?)\{\{\1\}\}/msg;
const templateTagRe = /\{\{(#|=|&|!|>|\{})?(.+?)\1?\}\}+/g;
const clozeTextRe = /\{\{c(\d+)::(.*?)(?:::(.*?))?\}\}/sg;

// everything
// a bit unsafe at the moment, doesn't completely support all of Anki's tag features
export const RenderAnkiTemplate: React.FC<Props> = ({note, model, template}) => {
    let qTemplate = template.bqfmt || template.qfmt;
    let aTemplate = template.bafmt || template.afmt;
    // preprocess to extract any field modifiers e.g. {{hint:Field}}, {{clickable:Tags}}, {{type:cloze:Text}}
    qTemplate = PreprocessAnkiTemplate(qTemplate);
    aTemplate = PreprocessAnkiTemplate(aTemplate);
    let templateFields = Object.fromEntries(zip(model.flds.map((f)=>f.name), note.fields));
    templateFields["Tags"] = note.tags.join(" ");
    if (model.type === 1) {
        // console.log("Template fields", templateFields);
        // label all the fields that are cloze
        // render the question templates
        let qTemplateTags = ExtractAndLabelTags(qTemplate);
        let aTemplateTags = ExtractAndLabelTags(aTemplate);
        let qClozeTags = qTemplateTags.filter(tag => tag.type === "cloze")
        let aClozeTags = aTemplateTags.filter(tag => tag.type === "cloze")
        let clozeAnswers = qClozeTags.map((tag: LabelledTags): Map<number, Array<ClozeItem>> => {
            // get the field content
            let fieldContent = templateFields[tag.name];
            let clozes = fieldContent.matchAll(clozeTextRe);
            let clozeItems = new Map<number, Array<ClozeItem>>();
            // get each cloze item
            for (let match of clozes) {
                let [raw, index, content, hint] = match;
                if (!(clozeItems.get(index)))
                    clozeItems.set(index, [{content, hint, raw}]);
                else {
                    // i don't get why typescript is making a fuss about this, didn't I just check for existence?
                    let existing = clozeItems.get(index) as Array<ClozeItem>;
                    clozeItems.set(index, existing.concat([{content, hint, raw}]))
                }
            }
            return clozeItems;
        })
        clozeAnswers = Object.fromEntries(zip(qClozeTags.map(t=>t.name), clozeAnswers))
        console.log("Cloze Answers", clozeAnswers)
        let clozeQs = Object.keys(clozeAnswers).map(fieldName => {
            let fieldClozes: Map<number, Array<ClozeItem>> = clozeAnswers[fieldName];
            // console.log(fieldClozes, Array.from(fieldClozes))
            return Array.from(fieldClozes.keys()).map((clozeNumber) => {
                let fieldText = templateFields[fieldName];
                fieldClozes.forEach((replacementArr, clozeIndex) => {
                    if (clozeIndex === clozeNumber) {
                        replacementArr.forEach(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, `<span class='cloze'>[${hint? hint : '...'}]</span>`)
                        })
                    } else {
                        replacementArr.forEach(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, content)
                        })
                    }
                })
                return fieldText;
            });
        })
        let clozeAs = Object.keys(clozeAnswers).map(fieldName => {
            let fieldClozes: Map<number, Array<ClozeItem>> = clozeAnswers[fieldName];
            // console.log(fieldClozes, Array.from(fieldClozes))
            return Array.from(fieldClozes.keys()).map((clozeNumber) => {
                let fieldText = templateFields[fieldName];
                fieldClozes.forEach((replacementArr, clozeIndex) => {
                    if (clozeIndex === clozeNumber) {
                        replacementArr.forEach(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, `<span class='cloze'>${content}</span>`)
                        })
                    } else {
                        replacementArr.forEach(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, content)
                        })
                    }
                })
                return fieldText;
            });
        })
        clozeQs = Object.fromEntries(zip(qClozeTags.map(t=>t.name), clozeQs));
        clozeAs = Object.fromEntries(zip(aClozeTags.map(t=>t.name), clozeAs));
        // console.log(qClozeTags, clozeQs)
        let qTemplates = qClozeTags.map(({name, type, raw}) => {
            let preRender = qTemplate.replace(raw, "{{cq}}");
            return clozeQs[name].map((question) => {
                return Mustache.render(preRender, {cq: question, ...templateFields})
            })
        }).reduce((a,b) => a.concat(b))
        // console.log(aClozeTags, clozeAs)
        let aTemplates = qClozeTags.map(({name, type, raw}) => {
            let preRender = qTemplate.replace(raw, "{{ca}}");
            return clozeAs[name].map((answer) => {
                return Mustache.render(preRender, {ca: answer, ...templateFields})
            })
        }).reduce((a,b) => a.concat(b))
        // console.log(qTemplates);
        // console.log(aTemplates);
        return (
            <>
                {range(qTemplates.length).map((i) => {
                    // let qHTML = {__html: qTemplates[i]}
                    // let aHTML = {__html: aTemplates[i]}
                    // let cardStyle = {__html: model.css}
                    return (
                        <FlipCard qHTML={qTemplates[i]} aHTML={aTemplates[i]} style={model.css} />
                    // <div className="cardsides">
                    //     <style dangerouslySetInnerHTML={cardStyle}></style>
                    //     <div className="card" dangerouslySetInnerHTML={qHTML}>
                    //     </div>
                    //     <div className="card" dangerouslySetInnerHTML={aHTML}>
                    //     </div>
                    // </div>
                    )}
                )}
            </>
        )
    } else {
        // let qHTML = {__html: Mustache.render(qTemplate, templateFields)}
        // let aHTML = {__html: Mustache.render(aTemplate, templateFields)}
        // let cardStyle = {__html: model.css}
        return (
            <FlipCard qHTML={Mustache.render(qTemplate, templateFields)}
                aHTML={Mustache.render(aTemplate, templateFields)}
                style={model.css} />
            // <div className="cardsides">
            //     <style dangerouslySetInnerHTML={cardStyle}></style>
            //     <div className="card" dangerouslySetInnerHTML={qHTML}>
            //     </div>
            //     <div className="card" dangerouslySetInnerHTML={aHTML}>
            //     </div>
            // </div>
        )
    }
}

const PreprocessAnkiTemplate = (template: string): string => {
    // this doesn't actually work yet but the intent is for it to strip tag modifiers
    return template
}

function ExtractAndLabelTags(template: string): LabelledTags[] {
    let templateTags = template.matchAll(templateTagRe);
    let labelledTags = new Array<LabelledTags>();
    for (let match of templateTags) {
        let tagName = match[2];
        let tagType = "plain";
        let tagSplit = tagName.split(":");
        if (tagSplit.length > 1 && tagSplit.includes("cloze")) {
            tagName = tagSplit[tagSplit.length - 1];
            tagType = "cloze";
        }
        labelledTags.push({
            name: tagName,
            type: tagType,
            raw: match[0]
        });
    }
    return labelledTags;
}