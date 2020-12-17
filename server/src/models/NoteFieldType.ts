import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { AnyType } from './AnyType';

export const NoteFieldType = new GraphQLObjectType({
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