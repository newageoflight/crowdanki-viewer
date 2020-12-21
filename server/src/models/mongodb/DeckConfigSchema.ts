import mongoose from "mongoose";

export const LapseSchema = new mongoose.Schema({
    // floats
    delays: [Number],
    leechAction: Number,
    leechFails: Number,
    minInt: Number,
    // interval multiplier i.e. float
    mult: Number
})


export const NewCardConfigSchema = new mongoose.Schema({
    bury: Boolean,
    // delays are floats
    delays: Number,
    initialFactor: Number,
    ints: Number,
    order: Number,
    perDay: Number,
    separate: Boolean,
})

export const ReviewCardConfigSchema = new mongoose.Schema({
    bury: Boolean,
    // easy ease factor, which is a float
    ease4: Number,
    fuzz: Number,
    hardFactor: Number,
    ivlFct: Number,
    // everything above is a float, everything below is an int
    maxIvl: Number,
    minSpace: Number,
    perDay: Number,
})

export const DeckConfigSchema = new mongoose.Schema({
    __type__: String,
    autoplay: Boolean,
    crowdanki_uuid: String,
    dyn: Boolean,
    lapse: LapseSchema,
    maxTaken: Number,
    name: String,
    new: NewCardConfigSchema,
    replayq: Boolean,
    rev: ReviewCardConfigSchema,
    timer: Number,
})

