import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt } from "graphql"
import { AnyType } from './AnyType';
import { NoteFieldType } from './NoteFieldType';
import { CardTemplateType } from './CardTemplateType';

export const NoteModelType = new GraphQLObjectType({
    name: "NoteModel",
    fields: () => ({
        _type: {type: GraphQLString},
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