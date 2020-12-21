import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { arrayToTree } from "performant-array-to-tree";

import { Deck } from './components/Deck';
import { decksState } from './context/DeckState';
import { NoteList } from './components/NoteList';
import { DeckInterface } from './interfaces/DeckInterface';

import './css/App.css';
import logo from './crowdanki.svg';
import { tagsState } from './context/TagsState';
import { TagList } from './components/TagList';
import { uniq } from './utils/utils';

// to prevent VSCode from glitching out about the TSConfig:
// https://stackoverflow.com/a/64969461/5403467

// later planning to add Anki save and export support with mkanki:
// https://github.com/nornagon/mkanki

// TODO: somehow tie this into a MERN project
// TODO: add filter views for tags

function App() {
  const [decks, setDecks] = useRecoilState(decksState);
  const setTags = useSetRecoilState(tagsState);

  useEffect(() => {
    // if you don't do it this way typescript will throw a fit
    async function getData() {
      const getFetch = await fetch("/api/v1/decks");
      const { data: getJSON } = await getFetch.json();
      const stateTree = arrayToTree(getJSON, {id: "crowdanki_uuid", parentId: "parent", dataField: null});
      console.log("State tree", stateTree)
      setDecks(stateTree as DeckInterface[]);

      const fetchTags = await fetch("/api/v1/tags");
      const { data: getTags } = await fetchTags.json();
      setTags(uniq(getTags.map(({tags}) => tags).reduce((a, b) => a.concat(b))));
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
          <div className="deck-list">
            <h2>Decks</h2>
            <ul>
              {decks.map(deck => <Deck key={deck.crowdanki_uuid} item={deck} level={0}/>)}
            </ul>
          </div>
          <TagList />
        </div>
        <NoteList/>
      </div>
    </>
  );
}

export default App;
