import mongoose from 'mongoose';
import { DeckConfigSchema } from './DeckConfigSchema';
import { NoteModelSchema } from './NoteModelSchema';

export const DeckSchema = new mongoose.Schema({
    __type__: String,
    children: [String],
    parent: String,
    crowdanki_uuid: String,
    deck_config_uuid: String,
    deck_configurations: [DeckConfigSchema],
    desc: String,
    dyn: Number,
    extendNew: Number,
    extendRev: Number,
    name: String,
    note_models: [NoteModelSchema],
    notes: [String],
}, {collection: "decks"})

export const DeckModel = mongoose.model("Deck", DeckSchema)