import React from 'react';
import { useRecoilValue } from 'recoil';

import { Note } from "./Note";
import { noteViewState } from './../context/NoteViewState';
import { noteModelsState } from './../context/NoteModelsState';
import { uniq } from "../utils/utils"
import { NoteModel } from './../interfaces/NoteModel';
import { NoteInserter } from './NoteInserter';

export const NoteList = () => {
    const notes = useRecoilValue(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);
    const uniqModels = uniq(noteModels);

    return (
        <div className="note-container">
            <h2>Notes</h2>
           {notes.map((note, idx) => (
               <>
                <NoteInserter position={idx} useModel={note.note_model_uuid}/>
                <Note key={note.guid} note={note} model={uniqModels.find((m) => m.crowdanki_uuid === note.note_model_uuid) as NoteModel}/>
               </>
           ))} 
           {notes.length > 0 ? (<NoteInserter position={notes.length-1} useModel={notes[notes.length-1].note_model_uuid} />) : ""}
        </div>
    )
}