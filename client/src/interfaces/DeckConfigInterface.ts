export interface DeckConfigInterface {
    __type__: string;
    autoplay: boolean;
    crowdanki_uuid: string;
    dyn: boolean;
    lapse: LapseInterface;
    maxTaken: number;
    name: string;
    new: NewCardConfigInterface;
    replayq: boolean;
    rev: ReviewCardConfigInterface;
    timer: number;
}

interface LapseInterface {
    // floats
    delays: Array<number>;
    leechAction: number;
    leechFails: number;
    minInt: number;
    // interval multiplier i.e. float
    mult: number;
}

interface NewCardConfigInterface {
    bury: boolean;
    // delays are floats
    delays: Array<number>;
    initialFactor: number;
    ints: Array<number>;
    order: number;
    perDay: number;
    separate: boolean;
}

interface ReviewCardConfigInterface {
    bury: boolean;
    // easy ease factor, which is a float
    ease4: number;
    fuzz: number;
    hardFactor: number;
    ivlFct: number;
    // everything above is a float, everything below is an int
    maxIvl: number;
    minSpace: number;
    perDay: number;
}