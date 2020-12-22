import { atom } from 'recoil';
import { FlatDeckInterface } from '../interfaces/DeckInterface';

export const deckMapState = atom({
    key: "DeckMap",
    default: new Array<FlatDeckInterface>()
})