import { DeckConfigInterface } from './DeckConfigInterface';
import { NoteInterface } from './NoteInterface';
import { NoteModel } from './NoteModel';

// special utility types for this kind of circumstance
// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittk
export interface AnkiDeckInterface {
    __type__: "Deck";
    children: AnkiDeckInterface[];
    crowdanki_uuid: string;
    deck_config_uuid: string;
    deck_configurations: DeckConfigInterface[];
    desc: string;
    dyn: number;
    extendNew: number;
    extendRev: number;
    media_files: string[];
    name: string;
    note_models: NoteModel[];
    notes: NoteInterface[];
}
export interface DeckInterface extends Omit<AnkiDeckInterface, "children" | "notes"> {
    children: DeckInterface[];
    notes: string[];
}

export interface FlatDeckInterface extends Omit<DeckInterface, "children"> {
    children: string[];
    parent: string;
}
