import React, { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { noteViewState } from './../context/NoteViewState';
import { DeckInterface } from '../interfaces/DeckInterface';
import { noteModelsState } from './../context/NoteModelsState';
import { uniq } from "../utils/utils";
import { NoteInterface } from '../interfaces/NoteInterface';

interface Props {
    key: string;
    item: DeckInterface;
    level: number;
}

export const Deck: React.FC<Props> = (props) => {
    const [showChildren, setShowChildren] = useState(false);
    const setNoteView = useSetRecoilState(noteViewState);
    const setNoteModels = useSetRecoilState(noteModelsState);

    useEffect(() => {
        setNoteModels((oldModels) => props.item.note_models === undefined ? oldModels : uniq(oldModels.concat(props.item.note_models)))
    }, [props.item.note_models, setNoteModels])

    const recurseNotes = () => {
        // dfs through the deck tree
        // add notes of all children to the allNotes array and return
        let allNotes = new Array<NoteInterface>();
        let deckStack = new Array<DeckInterface>();
        deckStack.push(props.item)
        while (deckStack.length > 0) {
            let currentDeck = deckStack.pop() as DeckInterface;
            allNotes = allNotes.concat(currentDeck.notes);
            deckStack = deckStack.concat(currentDeck.children);
        }
        return allNotes;
    }
    const everyNotes = recurseNotes();

    const updateView = () => {
        setNoteView((oldView) => [
            ...everyNotes
        ]);
    }

    return (
        <>
            <ul>
                <li className="row">
                    <button className="show-children" onClick={() => {setShowChildren(!showChildren)}}>
                        {showChildren ? "-" : "+"}
                    </button>
                    <div className="deck-details" onClick={updateView}>
                        <div className="deck-name">
                            {props.item.name}
                        </div>
                        <div className="deck-count">
                            {everyNotes.length}
                        </div>
                    </div>
                </li>
                {showChildren ? props.item.children.map((subdeck) => (
                    <Deck key={subdeck.crowdanki_uuid} item={subdeck} level={props.level + 1} />
                )) : ""}
            </ul>
        </>
    )
}
