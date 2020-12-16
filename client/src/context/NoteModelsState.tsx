import { atom } from 'recoil';
import { NoteModel } from './../interfaces/NoteModel';

export const noteModelsState = atom({
    key: "NoteModels",
    default: Array<NoteModel>()
})