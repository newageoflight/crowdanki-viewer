import React from 'react';
import { useRecoilValue } from 'recoil';

import { Note } from "./Note";
import { NoteModel } from './../interfaces/NoteModel';
import { NoteInserter } from './NoteInserter';

import { noteViewState } from './../context/NoteViewState';
import { noteModelsState } from './../context/NoteModelsState';
import { noteViewLoadingState } from './../context/NoteViewLoadingState';

export const NoteList = () => {
    const notes = useRecoilValue(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);
    const notesLoading = useRecoilValue(noteViewLoadingState);

    // The note list renderer should also add the ability to display comment blocks
    // These will just be notes with 1 field called "comment"
    // and it will also have a dummy model that only exists within this app (to fit the JSON constraints)
    // it will not be exported to Anki, it just shows up here as a place to have discussions, etc.
    return (
        <div className="notes-container">
            <h2>Notes</h2>
            {notesLoading ? (<p>Loading...</p>) :
                notes.length > 0 ? notes.map((note, idx) => (
                    <>
                    <NoteInserter key={idx} position={idx} useModel={note.note_model_uuid}/>
                    <Note key={note.guid} note={note} model={noteModels.find((m) => m.crowdanki_uuid === note.note_model_uuid) as NoteModel}/>
                    </>
                )) : (<p>There are no notes to show.</p>)
            } 
            {notes.length > 0 ? (<NoteInserter key={notes.length} position={notes.length-1} useModel={notes[notes.length-1].note_model_uuid} />) : ""}
        </div>
    )
}