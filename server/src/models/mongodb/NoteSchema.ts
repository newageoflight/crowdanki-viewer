import mongoose from "mongoose";

export const NoteSchema = new mongoose.Schema({
    __type__: {type: String},
    fields: {type: [String]},
    guid: {type: String},
    note_model_uuid: {type: String},
    tags: {type: [String]},
    deck_uuid: {type: String}
}, {collection: "notes"})

export const NoteDBModel = mongoose.model("Note", NoteSchema)