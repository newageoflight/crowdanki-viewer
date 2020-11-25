import { atom } from 'recoil';
import { NoteModel } from './../interfaces/NoteModel';

export const noteModels = atom({
    key: "NoteModels",
    default: Array<NoteModel>()
})