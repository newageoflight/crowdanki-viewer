import mongoose from 'mongoose';
import { DeckConfigSchema } from './DeckConfigSchema';
import { NoteModelSchema } from './NoteModelSchema';
import { NoteSchema } from './NoteSchema';

export const DeckSchema = new mongoose.Schema({
    __type__: {type: String},
    children: {type: [String]},
    parent: {type: String},
    crowdanki_uuid: {type: String},
    deck_config_uuid: {type: String},
    deck_configurations: {type: [DeckConfigSchema]},
    desc: {type: String},
    dyn: {type: Number},
    extendNew: {type: Number},
    extendRev: {type: Number},
    name: {type: String},
    note_models: {type: [NoteModelSchema]},
    notes: {type: [String]},
}, {collection: "decks"})

export const DeckModel = mongoose.model("Deck", DeckSchema)