import React, { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { noteViewState } from './../context/NoteViewState';
import { DeckInterface } from '../interfaces/DeckInterface';
import { noteModelsState } from './../context/NoteModelsState';
import { uniq } from "../utils/utils";
import { NoteInterface } from '../interfaces/NoteInterface';
import { noteViewLoadingState } from './../context/NoteViewLoadingState';

interface Props {
    key: string;
    item: DeckInterface;
    level: number;
}

export const Deck: React.FC<Props> = (props) => {
    const [showChildren, setShowChildren] = useState(false);
    const setNoteView = useSetRecoilState(noteViewState);
    const setNoteModels = useSetRecoilState(noteModelsState);
    const setNotesLoading = useSetRecoilState(noteViewLoadingState);

    useEffect(() => {
        setNoteModels((oldModels) => props.item.note_models === undefined ? oldModels : uniq(oldModels.concat(props.item.note_models)))
        // eslint-disable-next-line
    }, [])

    const recurseNotes = () => {
        // dfs through the deck tree
        // add notes of all children to the allNotes array and return
        let allNotesLength = 0;
        let allDecks = new Array<string>();
        let deckStack = new Array<DeckInterface>();
        deckStack.push(props.item)
        while (deckStack.length > 0) {
            let currentDeck = deckStack.pop() as DeckInterface;
            allDecks.push(currentDeck.crowdanki_uuid);
            allNotesLength += currentDeck.notes.length;
            deckStack = deckStack.concat(currentDeck.children);
        }
        return {allDecks, allNotesLength};
    }
    const {allDecks: everyDecks, allNotesLength: everyNotesLength} = recurseNotes();

    const updateView = async () => {
        // loop through all children first
        // basically bring the parent and all its children's uuids together to make a few requests to the server
        setNotesLoading(true);
        let notesToSet = new Array<NoteInterface>();
        for (let deck_id of everyDecks) {
            let noteRequest = await fetch(`/api/v1/notes/deck/${deck_id}`)
            let { data: noteJSON } = await noteRequest.json()
            notesToSet = notesToSet.concat(noteJSON);
        }
        setNoteView(notesToSet);
        setNotesLoading(false)
    }

    return (
        <>
            <li className="row">
                <button className="show-children" onClick={() => setShowChildren(!showChildren)}>
                    {showChildren ? "-" : "+"}
                </button>
                <div className="deck-details" onClick={updateView}>
                    <div className="deck-name">
                        {props.item.name}
                    </div>
                    <div className="deck-count">
                        {everyNotesLength}
                    </div>
                </div>
            </li>
            {showChildren ? (props.item.children.length > 0 ? props.item.children.map((subdeck) => (
                <ul>
                    <Deck key={subdeck.crowdanki_uuid} item={subdeck} level={props.level + 1} />
                </ul>
            )) : "") : ""}
        </>
    )
}
