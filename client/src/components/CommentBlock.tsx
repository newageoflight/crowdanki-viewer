import React from 'react'
import { useRecoilState } from 'recoil';
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

import { NoteInterface } from '../interfaces/NoteInterface'
import { noteStateFamily } from './../context/NoteStateFamily';

interface Props {
    note: NoteInterface;
}

export const CommentBlock: React.FC<Props> = ({note}) => {
    const [noteState, setNoteState] = useRecoilState(noteStateFamily(note.guid));

    const handleChange = (evt: any) => {
        console.log("Changed")
    }

    return (
        <div className="note-row">
            <SimpleMDE value={noteState.fields[0]} onChange={handleChange} />
        </div>
    )
}

// todo: add an EasyMDE textarea within this component
// https://www.npmjs.com/package/react-simplemde-editor