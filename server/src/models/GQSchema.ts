import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLScalarType, GraphQLSchema, GraphQLString, Kind } from "graphql";
import { GQInitialState } from './../data/InitialState';

const AnyType = new GraphQLScalarType({
    name: "AnyObject",
    description: "Arbitrary object similar to any in Typescript",
    parseValue: value => {
        return typeof value === "object" ? value
            : typeof value === "string" ? JSON.parse(value)
            : null
    },
    serialize: value => {
        return typeof value === "object" ? value
            : typeof value === "string" ? JSON.parse(value)
            : null
    },
    parseLiteral: ast => {
        switch (ast.kind) {
            case Kind.STRING:
                return JSON.parse(ast.value)
            case Kind.OBJECT:
                throw new Error("Not sure what to do with OBJECT for ObjectScalarType")
            default:
                return null;
        }
    }
})

const DeckType = new GraphQLObjectType({
    name: "Deck",
    fields: () => ({
        __type__: {type: GraphQLString},
        // this needs to be fixed first. first try flattening the deck list so that decks also mention their parent
        children: {type: new GraphQLList(GraphQLString)},
        crowdanki_uuid: {type: GraphQLString},
        deck_config_uuid: {type: GraphQLString},
        deck_configurations: {type: new GraphQLList(AnyType)},
        desc: {type: GraphQLString},
        dyn: {type: GraphQLInt},
        extendNew: {type: GraphQLInt},
        extendRev: {type: GraphQLInt},
        name: {type: GraphQLString},
        note_models: {type: new GraphQLList(NoteModelType)},
        notes: {type: new GraphQLList(NoteType)},
        parent: {type: GraphQLString}
    })
})

const NoteModelType = new GraphQLObjectType({
    name: "NoteModel",
    fields: () => ({
        __type__: {type: GraphQLString},
        crowdanki_uuid: {type: GraphQLString},
        css: {type: GraphQLString},
        flds: {type: new GraphQLList(NoteFieldType)},
        latexPost: {type: GraphQLString},
        latexPre: {type: GraphQLString},
        latexsvg: {type: GraphQLBoolean},
        name: {type: GraphQLString},
        req: {type: new GraphQLList(AnyType)},
        sortf: {type: GraphQLInt},
        tags: {type: new GraphQLList(GraphQLString)},
        tmpls: {type: new GraphQLList(CardTemplateType)},
        type: {type: GraphQLInt},
        vers: {type: new GraphQLList(AnyType)}
    })
})

const NoteType = new GraphQLObjectType({
    name: "Note",
    fields: () => ({
        __type__: {type: GraphQLString},
        fields: {type: new GraphQLList(GraphQLString)},
        guid: {type: GraphQLString},
        note_model_uuid: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
    })
})

const NoteFieldType = new GraphQLObjectType({
    name: "NoteField",
    fields: () => ({
        font: {type: GraphQLString},
        media: {type: new GraphQLList(AnyType)},
        name: {type: GraphQLString},
        ord: {type: GraphQLInt},
        rtl: {type: GraphQLBoolean},
        size: {type: GraphQLInt},
        sticky: {type: GraphQLBoolean},
    })
})

const CardTemplateType = new GraphQLObjectType({
    name: "CardTemplate",
    fields: () => ({
        afmt: {type: GraphQLString},
        bafmt: {type: GraphQLString},
        bfont: {type: GraphQLString},
        bqfmt: {type: GraphQLString},
        bsize: {type: GraphQLInt},
        did: {type: AnyType},
        name: {type: GraphQLInt},
        ord: {type: GraphQLInt},
        qfmt: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        decks: {
            type: new GraphQLList(DeckType),
            resolve(parent, args) {
                return GQInitialState;
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery
});