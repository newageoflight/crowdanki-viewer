import mongoose from "mongoose";

export const NoteSchema = new mongoose.Schema({
    __type__: String,
    fields: [String],
    guid: String,
    note_model_uuid: String,
    tags: [String],
    deck_uuid: String,
}, {collection: "notes"})

export const NoteDBModel = mongoose.model("Note", NoteSchema)