import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { Note } from "./Note";
import { noteViewState } from './../context/NoteViewState';
import { noteModelsState } from './../context/NoteModelsState';

export const NoteList = () => {
    const notes = useRecoilValue(noteViewState);
    const noteModels = useRecoilValue(noteModelsState);
    const uniqModels = uniq(noteModels);

    // useEffect(() => {
    //     if (uniqModels.length > 0) {
    //         console.log(noteModels);
    //         console.log(uniqModels);
    //     }
    // }, [noteModels, uniqModels])
    // const getRelevantModelFields: () => NoteModel | void = function () {
    //     console.log("Model getter called")
    //     if (uniqModels.length > 0) {
    //         let model = uniqModels.find((e) => e.crowdanki_uuid === note.note_model_uuid);
    //         return model.flds
    //     }
    // }

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
