import React from 'react'
import Mustache from "mustache";

import { NoteInterface } from '../interfaces/NoteInterface';
import { CardTemplateInterface } from './../interfaces/CardTemplate';
import { NoteModel } from './../interfaces/NoteModel';
import { zip } from './../utils/utils';

// this file helps render Anki card templates as React Components
// ports (some of) the template.py file in the Anki source code
// Read here for how to reverse engineer Anki's db:
// https://www.juliensobczak.com/write/2016/12/26/anki-scripting.html

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

const templateSectionRe = /\{\{[#|^]([^}]*)\}\}(.+?)\{\{\1\}\}/msg;
const templateTagRe = /\{\{(#|=|&|!|>|\{})?(.+?)\1?\}\}+/g;
const clozeTextRe = /\{\{c(\d+)::(.*?)(?:::(.*))?\}\}/sig;

// everything
// a bit unsafe at the moment, doesn't completely support all of Anki's tag features
// TODO: add types and interfaces to the arrow functions and objects so typescript will compile properly
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
        let clozeAnswers = qClozeTags.map((tag: LabelledTags) => {
            // get the field content
            let fieldContent = templateFields[tag.name];
            let clozes = fieldContent.matchAll(clozeTextRe);
            let clozeItems = {};
            // get each cloze item
            for (let match of clozes) {
                let [raw, index, content, hint] = match;
                if (!(index in clozeItems))
                    clozeItems[index] = [{content, hint, raw}];
                else
                    clozeItems[index].push({content, hint, raw})
            }
            return clozeItems;
        })
        clozeAnswers = Object.fromEntries(zip(qClozeTags.map(t=>t.name), clozeAnswers))
        console.log("Cloze Answers", clozeAnswers)
        let clozeQs = Object.keys(clozeAnswers).map(fieldName => {
            let fieldClozes = clozeAnswers[fieldName];
            let replaced = Object.keys(fieldClozes).map(clozeNumber => {
                let fieldText = templateFields[fieldName];
                Object.entries(fieldClozes).map(([clozeIndex, replacementArr]) => {
                    if (clozeIndex === clozeNumber) {
                        replacementArr.map(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, `<span class='cloze'[${hint? hint : '...'}]</span>`)
                        })
                    } else {
                        replacementArr.map(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, content)
                        })
                    }
                })
            })
        })
        // let clozeQs = Object.keys(clozeAnswers).map(fieldName => {
        //     let fieldClozes = clozeAnswers[fieldName];
        //     let replaced = Object.keys(fieldClozes).map(clozeNumber => {
        //         let fieldText = templateFields[fieldName];
        //         fieldClozes[clozeNumber].map(({content, hint, raw}) => {
        //             fieldText = fieldText.replace(raw, `<span class='cloze'>[${hint ? hint : "..."}]</span>`)
        //             // replace all the clozes in fieldtext that aren't this number with their content
        //             return ""
        //         })
        //         return fieldText;
        //     })
        //     return replaced;
        // });
        let clozeAs = Object.keys(clozeAnswers).map(fieldName => {
            let fieldClozes = clozeAnswers[fieldName];
            let replaced = Object.keys(fieldClozes).map(clozeNumber => {
                let fieldText = templateFields[fieldName];
                Object.entries(fieldClozes).map(([clozeIndex, replacementArr]) => {
                    if (clozeIndex === clozeNumber) {
                        replacementArr.map(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, `<span class='cloze'>${content}</span>`)
                        })
                    } else {
                        replacementArr.map(({content, hint, raw}) => {
                            fieldText = fieldText.replace(raw, content)
                        })
                    }
                })
            })
        })
        // let clozeAs = Object.keys(clozeAnswers).map(fieldName => {
        //     let fieldClozes = clozeAnswers[fieldName];
        //     let replaced = Object.keys(fieldClozes).map(clozeNumber => {
        //         let fieldText = templateFields[fieldName];
        //         fieldClozes[clozeNumber].map(({content, hint, raw}) => {
        //             fieldText = fieldText.replace(raw, `<span class='cloze'>${content}</span>`)
        //             // replace all the clozes in fieldtext that aren't this number with their content
        //             return ""
        //         })
        //         return fieldText;
        //     })
        //     return replaced;
        // });
        clozeQs = Object.fromEntries(zip(qClozeTags.map(t=>t.name), clozeQs));
        clozeAs = Object.fromEntries(zip(aClozeTags.map(t=>t.name), clozeAs));
        // let clozeAs = Object.keys(clozeAnswers).map(fieldName => {
        //     return clozeAnswers[fieldName].map(({content, hint, raw}) => 
        //         note.fields[fieldName].replace(raw, `<span class='cloze'>[${content}]</span>`)
        //     )
        // });
        console.log(qClozeTags, clozeQs)
        console.log(aClozeTags, clozeAs)
        // then ask mustache to render the modified template
        // render the answer template
        return (
            <>
                <div className="cardsides">
                    <div className="card">
                        Front
                    </div>
                    <div className="card">
                        Back
                    </div>
                </div>
            </>
        )
    } else {
        let qHTML = {__html: Mustache.render(qTemplate, templateFields)}
        let aHTML = {__html: Mustache.render(aTemplate, templateFields)}
        return (
            <div className="cardsides">
                <div className="card" dangerouslySetInnerHTML={qHTML}>
                </div>
                <div className="card" dangerouslySetInnerHTML={aHTML}>
                </div>
            </div>
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