import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Deck } from './components/Deck';
import { decksState } from './context/DeckState';
import { NoteList } from './components/NoteList';

import './css/App.css';
import logo from './crowdanki.svg';

// to prevent VSCode from glitching out about the TSConfig:
// https://stackoverflow.com/a/64969461/5403467

// later planning to add Anki save and export support with mkanki:
// https://github.com/nornagon/mkanki

// TODO: somehow tie this into a MERN project
// TODO: add filter views for tags

function App() {
  const [decks, setDecks] = useRecoilState(decksState);

  useEffect(() => {
    // if you don't do it this way typescript will throw a fit
    async function getData() {
      const getFetch = await fetch("/getdata");
      const getJSON = await getFetch.json();
      setDecks(getJSON);
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
        <div className="deck-list">
          <h2>Decks</h2>
          <Deck key={decks.crowdanki_uuid} item={decks} level={0}/>
        </div>
        <NoteList/>
      </div>
    </>
  );
}

export default App;
