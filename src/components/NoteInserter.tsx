import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { nanoid } from 'nanoid';

import { noteViewState } from './../context/NoteViewState';
import { createNote } from './../interfaces/NoteInterface';
import { noteModelsState } from './../context/NoteModelsState';
import { NoteModel } from '../interfaces/NoteModel';

export const NoteInserter: React.FC<{position: number, useModel: string}> = ({position, useModel}) => {
    const [noteListState, setNoteListState] = useRecoilState(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);

    const addNote = (evt) => {
        let newListState = noteListState.slice();
        let newNote = createNote({__type__: "Note", note_model_uuid: useModel});
        // populate the fields array of the new note with blank fields
        let correspondingModel = noteModels.find(m => m.crowdanki_uuid === useModel) as NoteModel;
        newNote.fields = new Array<string>(correspondingModel.flds.length).fill("");
        newNote.guid = nanoid(10); 
        console.log(newNote, position)

        newListState.splice(position, 0, newNote);
        setNoteListState(newListState);
    }

    return (
        <div className="note-inserter">
            <button className="add-note" onClick={addNote}>Add note</button>
        </div>
    )
}
