import mongoose, { Schema } from 'mongoose'

export const NoteFieldSchema = new mongoose.Schema({
    font: String,
    media: Schema.Types.Mixed,
    name: String,
    ord: Number,
    rtl: Boolean,
    size: Number,
    sticky: Boolean,
})