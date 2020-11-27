import { atomFamily, selectorFamily } from "recoil";
import { noteViewState } from './NoteViewState';
import { NoteInterface } from '../interfaces/NoteInterface'

export const noteStateFamily = atomFamily({
    key: 'SingleNote',
    default: selectorFamily({
        key: 'SingleNote/default',
        get: nid => ({get}): NoteInterface => {
            const activeNotes = get(noteViewState);
            
            return activeNotes.find((note) => note.guid === nid) as NoteInterface;
        }
    })
})