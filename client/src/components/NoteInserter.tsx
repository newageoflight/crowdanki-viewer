import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';

import { noteViewState } from './../context/NoteViewState';
import { createNote } from './../interfaces/NoteInterface';
import { noteModelsState } from './../context/NoteModelsState';
import { NoteModel } from '../interfaces/NoteModel';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const NoteInserter: React.FC<{position: number, useModel: string}> = ({position, useModel}) => {
    const [noteListState, setNoteListState] = useRecoilState(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);
    const [modelSelected, setModelSelected] = useState(useModel);

    const addNote = (evt) => {
        let newListState = noteListState.slice();
        let newNote = createNote({__type__: "Note", note_model_uuid: modelSelected});
        // populate the fields array of the new note with blank fields
        let correspondingModel = noteModels.find(m => m.crowdanki_uuid === modelSelected) as NoteModel;
        newNote.deck_uuid = noteListState[position].deck_uuid;
        newNote.fields = new Array<string>(correspondingModel.flds.length).fill("");
        newNote.guid = nanoid(10); 
        console.log(newNote, position)

        newListState.splice(position, 0, newNote);
        setNoteListState(newListState);
    }

    return (
        <div className="note-inserter">
            <button className="add-note" onClick={addNote}><FontAwesomeIcon icon={faPlus}/> Add note</button>
            <ul className="dropdown-content">
                {
                    noteModels.map((m, idx) => (
                        <li key={idx} onClick={evt => {
                            setModelSelected(m.crowdanki_uuid);
                            addNote(evt);
                        }}>{m.name}</li>
                    ))
                }
            </ul>
        </div>
    )
    // should also have a dropdown menu for other note types
}
