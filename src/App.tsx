import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Deck } from './components/Deck';
import { decksState } from './context/DeckState';
import { NoteList } from './components/NoteList';

import './css/App.css';

// to prevent VSCode from glitching out about the TSConfig:
// https://stackoverflow.com/a/64969461/5403467

// later planning to add Anki save and export support with mkanki:
// https://github.com/nornagon/mkanki

function App() {
  const [decks, setDecks] = useRecoilState(decksState);

  useEffect(() => {
    // if you don't do it this way typescript will throw a fit
    async function getData() {
      const getFetch = await fetch("/Anki_for_GSSE/deck.json");
      const getJSON = await getFetch.json();
      setDecks(getJSON);
    }
    
    getData();
  }, [setDecks]);

  return (
    <>
      <header>
        <h1>CrowdAnki JSON viewer</h1>
      </header>
      <div className="container">
        <div className="deck-list">
          <Deck key={decks.crowdanki_uuid} item={decks} level={0}/>
        </div>
        <NoteList/>
      </div>
    </>
  );
}

export default App;
