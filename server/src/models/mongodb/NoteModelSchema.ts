import mongoose, { SchemaTypes } from "mongoose";
import { CardTemplateSchema } from "./CardTemplateSchema";
import { NoteFieldSchema } from "./NoteFieldSchema";

export const NoteModelSchema = new mongoose.Schema({
    __type__: {type: "NoteModel"},
    crowdanki_uuid: {type: String},
    css: {type: String},
    flds: {type: [NoteFieldSchema]},
    latexPost: {type: String},
    latexPre: {type: String},
    latexsvg: {type: Boolean},
    name: {type: String},
    req: {type: SchemaTypes.Mixed},
    sortf: {type: Number},
    tags: {type: [String]},
    tmpls: {type: [CardTemplateSchema]},
    type: {type: Number},
    vers: {type: SchemaTypes.Mixed}
})