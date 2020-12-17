import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"

export const NoteType = new GraphQLObjectType({
    name: "Note",
    fields: () => ({
        _type: {type: GraphQLString},
        fields: {type: new GraphQLList(GraphQLString)},
        guid: {type: GraphQLString},
        note_model_uuid: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
    })
})