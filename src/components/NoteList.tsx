import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Note } from "./Note";
import { noteViewState } from './../context/NoteViewState';
import { noteModelsState } from './../context/NoteModelsState';

export const NoteList = () => {
    const notes = useRecoilValue(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);
    const uniqModels = uniq(noteModels);

    return (
        <div className="note-container">
           {notes.map((note) => (
               <Note key={note.guid} note={note} model={uniqModels.find((m) => m.crowdanki_uuid === note.note_model_uuid)}/>
           ))} 
        </div>
    )
}

function uniq(arr:Array<any>) {
    return arr.filter((elem, pos, array) => {
        return array.indexOf(elem) === pos;
    })
}
