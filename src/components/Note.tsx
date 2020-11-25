import React from 'react'
import { NoteInterface } from '../interfaces/NoteInterface';

interface Props {
    note: NoteInterface;
}

export const Note: React.FC<Props> = ({note}) => {
    return (
        <div className="row">
            <div className="col">
                {// edit fields in the left column
                note.fields.map((field) => (
                    <div contentEditable={true}>{field}</div>
                ))}
            </div>
            <div className="col">
                {// preview rendered cards in the right column

                }
            </div>
        </div>
    )
}
