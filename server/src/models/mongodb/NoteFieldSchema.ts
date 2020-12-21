import mongoose from 'mongoose'

export const NoteFieldSchema = new mongoose.Schema({
    font: {type: String},
    media: {type: mongoose.Schema.Types.Mixed},
    name: {type: String},
    ord: {type: Number},
    rtl: {type: Boolean},
    size: {type: Number},
    sticky: {type: Boolean},
})