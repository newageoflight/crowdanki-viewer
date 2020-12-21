import mongoose from "mongoose";

export const LapseSchema = new mongoose.Schema({
    // floats
    delays: {type: [Number]},
    leechAction: {type: Number},
    leechFails: {type: Number},
    minInt: {type: Number},
    // interval multiplier i.e. float
    mult: {type: Number}
})


export const NewCardConfigSchema = new mongoose.Schema({
    bury: {type: Boolean},
    // delays are floats
    delays: {type: Number},
    initialFactor: {type: Number},
    ints: {type: Number},
    order: {type: Number},
    perDay: {type: Number},
    separate: {type: Boolean},
})

export const ReviewCardConfigSchema = new mongoose.Schema({
    bury: {type: Boolean},
    // easy ease factor, which is a float
    ease4: {type: Number},
    fuzz: {type: Number},
    hardFactor: {type: Number},
    ivlFct: {type: Number},
    // everything above is a float, everything below is an int
    maxIvl: {type: Number},
    minSpace: {type: Number},
    perDay: {type: Number},
})

export const DeckConfigSchema = new mongoose.Schema({
    __type__: {type: String},
    autoplay: {type: Boolean},
    crowdanki_uuid: {type: String},
    dyn: {type: Boolean},
    lapse: {type: LapseSchema},
    maxTaken: {type: Number},
    name: {type: String},
    new: {type: NewCardConfigSchema},
    replayq: {type: Boolean},
    rev: {type: ReviewCardConfigSchema},
    timer: {type: Number},
})

