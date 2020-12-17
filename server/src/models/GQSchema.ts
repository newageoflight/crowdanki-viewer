import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { GQInitialState } from './../data/InitialState';
import { DeckType } from './DeckType';

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