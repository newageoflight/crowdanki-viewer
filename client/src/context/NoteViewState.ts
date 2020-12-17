import { atom } from 'recoil';
import { NoteInterface } from './../interfaces/NoteInterface';

export const noteViewState = atom({
    key: "NoteView",
    default: Array<NoteInterface>()
})