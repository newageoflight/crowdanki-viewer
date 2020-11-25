import React from 'react'
import ContentEditable from 'react-contenteditable';
import { NoteInterface } from '../interfaces/NoteInterface';
import { NoteModel } from './../interfaces/NoteModel';

interface Props {
    key: string;
    note: NoteInterface;
    model: NoteModel;
}

export const Note: React.FC<Props> = ({note, model}) => {
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
                {// preview rendered cards in the right column

                }
                (space for view of rendered cards: under construction)
            </div>
        </div>
    )
}

function range(start: number, stop?: number, step?: number): Array<number> {
    if (typeof stop == "undefined") {
        stop = start;
        start = 0;
    }

    if (typeof step == "undefined") {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    let result = Array<number>();
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}