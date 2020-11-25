import React from 'react'
import { NoteInterface } from '../interfaces/NoteInterface';

interface Props {
    note: NoteInterface;
}

export const Note: React.FC<Props> = ({note}) => {
    return (
        <div className="row">
            <div className="col">
                Fields go here. Should also include a button allowing you to preview generated cards.
                {note.fields.map((field) => (
                    <div className="field">
                    </div>
                ))}
            </div>
        </div>
    )
}
