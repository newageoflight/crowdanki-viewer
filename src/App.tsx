import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Deck } from './components/Deck';
import { decksState } from './context/DeckState';
import { NoteList } from './components/NoteList';

// to prevent VSCode from glitching out about the TSConfig:
// https://stackoverflow.com/a/64969461/5403467

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
  }, []);

  console.log("Decks:")
  console.log(decks);
  return (
    <div className="App">
      <h1>CrowdAnki JSON viewer</h1>
      <Deck item={decks} level={0}/>
      <NoteList/>
    </div>
  );
}

export default App;
