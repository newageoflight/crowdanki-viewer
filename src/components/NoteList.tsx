import React from 'react';
import { useRecoilValue } from 'recoil';

import { Note } from "./Note";
import { noteViewState } from './../context/NoteViewState';

export const NoteList = () => {
    const notes = useRecoilValue(noteViewState);

    return (
        <div className="note-container">
           {notes.map((note) => (
               <Note note={note}/>
           ))} 
        </div>
    )
}
