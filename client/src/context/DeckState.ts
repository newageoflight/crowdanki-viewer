import { atom } from "recoil";
import { DeckInterface } from './../interfaces/DeckInterface';

export const decksState = atom({
  key: "decks",
  // for safety reasons, the state should be set as a templated CrowdAnki JSON for a blank deck
  default: [{
    __type__: "Deck",
    children: [],
    crowdanki_uuid: "",
    deck_config_uuid: "",
    deck_configurations: [],
    desc: "",
    dyn: 0,
    extendNew: 0,
    extendRev: 0,
    media_files: [],
    name: "Default",
    note_models: [],
    notes: []
  }] as DeckInterface[]
});