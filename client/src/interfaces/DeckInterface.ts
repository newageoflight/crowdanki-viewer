import { NoteInterface } from './NoteInterface';
import { NoteModel } from './NoteModel';

export interface DeckInterface {
    __type__: string;
    children: Array<DeckInterface>;
    crowdanki_uuid: string;
    deck_config_uuid: string;
    deck_configurations: Array<any>;
    desc: string;
    dyn: number;
    extendNew: number;
    extendRev: number;
    name: string;
    note_models: Array<NoteModel>;
    notes: Array<NoteInterface>;
}
