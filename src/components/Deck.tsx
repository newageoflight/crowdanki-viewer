import React from 'react'
import { useSetRecoilState } from 'recoil'
import { noteViewState } from './../context/NoteViewState';
import { DeckInterface } from '../interfaces/DeckInterface';

interface Props {
    item: DeckInterface;
    level: number;
}

export const Deck: React.FC<Props> = (props) => {
    const setNoteView = useSetRecoilState(noteViewState);

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
                    <Deck item={subdeck} level={props.level + 1} />
                ))}
            </ul>
        </>
    )
}
