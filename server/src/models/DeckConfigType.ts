import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const DeckConfigType = new GraphQLObjectType({
    name: "DeckConfig",
    fields: () => ({
        _type: {type: GraphQLString},
        autoplay: {type: GraphQLBoolean},
        crowdanki_uuid: {type: GraphQLString},
        dyn: {type: GraphQLBoolean},
        lapse: {type: LapseType},
        maxTaken: {type: GraphQLInt},
        name: {type: GraphQLString},
        new: {type: NewCardConfigType},
        replayq: {type: GraphQLBoolean},
        rev: {type: ReviewCardConfigType},
        timer: {type: GraphQLInt}
    })
})

export const LapseType = new GraphQLObjectType({
    name: "LapseConfig",
    fields: () => ({
        delays: {type: new GraphQLList(GraphQLFloat)},
        leechAction: {type: GraphQLInt},
        leechFails: {type: GraphQLInt},
        minInt: {type: GraphQLInt},
        mult: {type: GraphQLFloat},
    })
})

export const NewCardConfigType = new GraphQLObjectType({
    name: "NewCardConfig",
    fields: () => ({
        bury: {type: GraphQLBoolean},
        delays: {type: new GraphQLList(GraphQLFloat)},
        initialFactor: {type: GraphQLFloat},
        ints: {type: new GraphQLList(GraphQLInt)},
        order: {type: GraphQLInt},
        perDay: {type: GraphQLInt},
        separate: {type: GraphQLBoolean},
    })
})

export const ReviewCardConfigType = new GraphQLObjectType({
    name: "ReviewCardConfig",
    fields: () => ({
        bury: {type: GraphQLBoolean},
        ease4: {type: GraphQLFloat},
        fuzz: {type: GraphQLFloat},
        hardFactor: {type: GraphQLFloat},
        ivlFct: {type: GraphQLFloat},
        maxIvl: {type: GraphQLInt},
        minSpace: {type: GraphQLInt},
        perDay: {type: GraphQLInt},
    })
})
