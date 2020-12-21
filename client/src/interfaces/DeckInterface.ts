import { NoteModel } from './NoteModel';

export interface DeckInterface {
    __type__: "Deck";
    children: DeckInterface[];
    crowdanki_uuid: string;
    deck_config_uuid: string;
    deck_configurations: any[];
    desc: string;
    dyn: number;
    extendNew: number;
    extendRev: number;
    media_files: string[];
    name: string;
    note_models: NoteModel[];
    notes: string[];
}
