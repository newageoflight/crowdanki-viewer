import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { arrayToTree } from "performant-array-to-tree";

import { decksState } from './context/DeckState';
import { DeckList } from './components/DeckList';
import { NoteList } from './components/NoteList';
import { DeckInterface, FlatDeckInterface } from './interfaces/DeckInterface';

import './css/App.css';
import logo from './crowdanki.svg';
import { tagsState } from './context/TagsState';
import { TagList } from './components/TagList';
import { uniq } from './utils/utils';
import { deckMapState } from './context/DeckMapState';
import { analyseAnkiTags } from './utils/AnalyseTags';
import { flattenDecks } from './utils/FlattenDecks';

// to prevent VSCode from glitching out about the TSConfig:
// https://stackoverflow.com/a/64969461/5403467

// later planning to add Anki save and export support with mkanki:
// https://github.com/nornagon/mkanki

// TODO: somehow tie this into a MERN project
// TODO: add filter views for tags

function App() {
  const setDecks = useSetRecoilState(decksState);
  const setDeckMap = useSetRecoilState(deckMapState);
  const setTags = useSetRecoilState(tagsState);

  useEffect(() => {
    // if you don't do it this way typescript will throw a fit
    async function getData() {
      // build up the deck tree first
      const getFetch = await fetch("/api/v1/decks");
      const { data: getJSON } = await getFetch.json();
      const stateTree = arrayToTree(getJSON, {id: "crowdanki_uuid", parentId: "parent", dataField: null}) as DeckInterface[];
      setDecks(stateTree);
      setDeckMap(flattenDecks(stateTree) as FlatDeckInterface[]);

      // build up the tag tree
      const fetchTags = await fetch("/api/v1/tags");
      const { data: getTags } = await fetchTags.json();
      // now we need to uniq the tags
      const uniqueTags = uniq(getTags.map(({tags}) => tags).reduce((a, b) => a.concat(b)));
      // then convert them into a tree structure for efficiency's sake
      let analysedTags = analyseAnkiTags(uniqueTags as string[]);
      console.log(analysedTags);
      setTags(analysedTags);
    }
    
    getData();
    // note: useEffect only re-calls when a dependency array item changes
    // this also tends to make the app extremely slow in practice so i'll need to figure something out
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="header">
        <div className="container">
          <img src={logo} alt="Logo" />
          <h1>CrowdAnki Web Viewer</h1>
        </div>
      </div>
      <div className="container">
        <div className="left-bar">
          <DeckList />
          <TagList />
        </div>
        <NoteList/>
      </div>
    </>
  );
}

export default App;
