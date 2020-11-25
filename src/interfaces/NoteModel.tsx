import { NoteField } from "./NoteField";
import { CardTemplateInterface } from './CardTemplate';

export interface NoteModel {
    __type__: string,
    crowdanki_uuid: string,
    css: string,
    flds: Array<NoteField>,
    latexPost: string,
    latexPre: string,
    latexsvg: boolean,
    name: string,
    req: Array<any>,
    sortf: number,
    tags: Array<string>,
    tmpls: Array<CardTemplateInterface>,
    type: number,
    vers: Array<any>
}