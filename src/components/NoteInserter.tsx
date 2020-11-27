import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { noteViewState } from './../context/NoteViewState';
import { createNote } from './../interfaces/NoteInterface';
import { noteModelsState } from './../context/NoteModelsState';
import { uniq } from '../utils/utils';
import { NoteModel } from '../interfaces/NoteModel';

export const NoteInserter: React.FC<{position: number, useModel: string}> = ({position, useModel}) => {
    const [noteListState, setNoteListState] = useRecoilState(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);
    const uniqModels = uniq(noteModels);

    const addNote = (evt) => {
        let newListState = noteListState.slice();
        let newNote = createNote({note_model_uuid: useModel});
        // populate the fields array of the new note with blank fields
        let correspondingModel = uniqModels.find(m => m.crowdanki_uuid === useModel) as NoteModel;
        newNote.fields = new Array<string>(correspondingModel.flds.length);

        newListState.splice(position, 0, newNote);
        setNoteListState(newListState);
    }

    return (
        <div className="note-inserter">
            <button className="add-note" onClick={addNote}>Add note</button>
        </div>
    )
}
