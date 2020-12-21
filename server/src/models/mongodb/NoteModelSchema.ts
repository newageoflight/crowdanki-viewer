import mongoose, { Schema} from "mongoose";
import { CardTemplateSchema } from "./CardTemplateSchema";
import { NoteFieldSchema } from "./NoteFieldSchema";

export const NoteModelSchema = new mongoose.Schema({
    __type__: String,
    crowdanki_uuid: String,
    css: String,
    flds: [NoteFieldSchema],
    latexPost: String,
    latexPre: String,
    latexsvg: Boolean,
    name: String,
    req: Schema.Types.Mixed,
    sortf: Number,
    tags: [String],
    tmpls: [CardTemplateSchema],
    type: Number,
    vers: Schema.Types.Mixed,
})