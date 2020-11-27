import React, { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { noteViewState } from './../context/NoteViewState';
import { DeckInterface } from '../interfaces/DeckInterface';
import { noteModelsState } from './../context/NoteModelsState';
import { uniq } from "../utils/utils";

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

    const updateView = () => {
        setNoteView((oldView) => [
            ...props.item.notes
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
                            {props.item.notes.length}
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
