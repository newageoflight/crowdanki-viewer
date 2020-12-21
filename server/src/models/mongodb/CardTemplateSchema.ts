import mongoose, { Schema } from 'mongoose';

export const CardTemplateSchema = new mongoose.Schema({
    afmt: String,
    bafmt: String,
    bfont: String,
    bqfmt: String,
    bsize: Number,
    did: Schema.Types.Mixed,
    name: String,
    ord: Number,
    qfmt: String,
})