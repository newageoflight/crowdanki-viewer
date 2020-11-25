import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { noteViewState } from './../context/NoteViewState';
import { DeckInterface } from '../interfaces/DeckInterface';
import { noteModelsState } from './../context/NoteModelsState';

interface Props {
    key: string;
    item: DeckInterface;
    level: number;
}

export const Deck: React.FC<Props> = (props) => {
    const setNoteView = useSetRecoilState(noteViewState);
    const setNoteModels = useSetRecoilState(noteModelsState);

    useEffect(() => {
        setNoteModels((oldModels) => props.item.note_models === undefined ? oldModels : oldModels.concat(props.item.note_models))
    }, [props.item.note_models, setNoteModels])

    const updateView = () => {
        setNoteView((oldView) => [
            ...props.item.notes
        ]);
    }

    return (
        <>
            <ul>
                <li className="row" onClick={updateView}>
                    <div className="deck-name">
                        {props.item.name}
                    </div>
                    <div className="deck-count">
                        {props.item.notes.length}
                    </div>
                </li>
                {props.item.children.map((subdeck) => (
                    <Deck key={subdeck.crowdanki_uuid} item={subdeck} level={props.level + 1} />
                ))}
            </ul>
        </>
    )
}
