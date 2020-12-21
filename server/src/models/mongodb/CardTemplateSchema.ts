import mongoose, { SchemaTypes } from 'mongoose';

export const CardTemplateSchema = new mongoose.Schema({
    afmt: {type: String},
    bafmt: {type: String},
    bfont: {type: String},
    bqfmt: {type: String},
    bsize: {type: Number},
    did: {type: SchemaTypes.Mixed},
    name: {type: String},
    ord: {type: Number},
    qfmt: {type: String},
})