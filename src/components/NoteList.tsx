import React from 'react';
import { useRecoilValue } from 'recoil';

import { Note } from "./Note";
import { noteViewState } from './../context/NoteViewState';
import { noteModelsState } from './../context/NoteModelsState';
import { uniq } from "../utils/utils"
import { NoteModel } from './../interfaces/NoteModel';

export const NoteList = () => {
    const notes = useRecoilValue(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);
    const uniqModels = uniq(noteModels);

    return (
        <div className="note-container">
           {notes.map((note) => (
               <Note key={note.guid} note={note} model={uniqModels.find((m) => m.crowdanki_uuid === note.note_model_uuid) as NoteModel}/>
           ))} 
        </div>
    )
}