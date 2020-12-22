import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';

import { HierarchicalTags } from '../interfaces/TagHierarchy';
import { noteViewState } from './../context/NoteViewState';
import { noteViewLoadingState } from './../context/NoteViewLoadingState';

interface Props {
    item: HierarchicalTags;
    fullName: string;
    level: number;
}

export const Tag: React.FC<Props> = ({item, fullName, level}) => {
    const [showChildren, setShowChildren] = useState(false);
    const setNoteView = useSetRecoilState(noteViewState);
    const setNotesLoading = useSetRecoilState(noteViewLoadingState);

    const updateView = (evt: any, tag: string) => {
        evt.preventDefault();
        console.log(tag)
        setNotesLoading(true);

        fetch(`/api/v1/notes/tags?tags=${tag}`).then(res => res.json())
            .then(({data}) => setNoteView(data));
        setNotesLoading(false);
    }

    return (
        <>
            <li className="row">
                <button className="show-children" onClick={() => {setShowChildren(!showChildren)}}>
                    {showChildren ? "-" : "+"}
                </button>
                <div className="tag-name" onClick={e => updateView(e, fullName)}>
                    {item.name}
                </div>
            </li>
            {showChildren ? (item.children.length > 0 ? item.children.map((tag) => (
                <ul>
                    <Tag key={tag.name} item={tag} fullName={[fullName, tag.name].join("::")} level={level + 1} />
                </ul>
            )) : "") : ""}
        </>
    )
}
