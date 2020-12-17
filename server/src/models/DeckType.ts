import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import { DeckConfigType } from './DeckConfigType';
import { NoteModelType } from './NoteModelType';
import { NoteType } from './NoteType';

export const DeckType = new GraphQLObjectType({
    name: "Deck",
    fields: () => ({
        _type: {type: GraphQLString},
        // this needs to be fixed first. first try flattening the deck list so that decks also mention their parent
        children: {type: new GraphQLList(GraphQLString)},
        crowdanki_uuid: {type: GraphQLString},
        deck_config_uuid: {type: GraphQLString},
        deck_configurations: {type: new GraphQLList(DeckConfigType)},
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