import React from 'react'
import ContentEditable from 'react-contenteditable';
import { NoteInterface } from '../interfaces/NoteInterface';
import { NoteModel } from './../interfaces/NoteModel';
import { CardCarousel } from './CardCarousel';
import { range } from './../utils/utils';

interface Props {
    key: string;
    note: NoteInterface;
    model: NoteModel;
}

// TODO: consider creating a function to preprocess the HTML so that the image sources are redirected to public/deck/media

export const Note: React.FC<Props> = ({note, model}) => {
    // TODO: add onChange hooks for the contentEditable divs so that the changes are propagated back to the app state
    return (
        <div className="row note-item">
            <div className="col note-fields">
                {// edit fields in the left column
                range(note.fields.length).map((idx) => (
                    <div className="field">
                        <div className="field-label">
                            {model.flds[idx].name}
                        </div>
                        <ContentEditable onChange={() => console.log("Changed")} html={note.fields[idx]} className="field-content" />
                    </div>
                ))}
                <div className="tags">
                    <div className="tag-label">
                        Tags
                    </div>
                    <ContentEditable onChange={() => console.log("Changed")} html={note.tags.join(" ")} className="tag-content" />
                </div>
            </div>
            <div className="col note-view">
                <CardCarousel key={note.guid} note={note} model={model}/>
            </div>
        </div>
    )
}