import React from 'react'
import { useRecoilValue } from 'recoil';
import { decksState } from './../context/DeckState';
import { Deck } from "./Deck";

export const DeckList: React.FC = () => {
    const decks = useRecoilValue(decksState);

    return (
        <div className="deck-list">
            <h2>Decks</h2>
            <ul>
                {decks.map(deck => <Deck key={deck.crowdanki_uuid} item={deck} level={0}/>)}
            </ul>
        </div>
    )
}
