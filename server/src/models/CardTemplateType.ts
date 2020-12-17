import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql"
import { AnyType } from "./AnyType"

export const CardTemplateType = new GraphQLObjectType({
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