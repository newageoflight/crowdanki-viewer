import React from 'react'
import { tagsState } from './../context/TagsState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { noteViewState } from './../context/NoteViewState';
import { noteViewLoadingState } from './../context/NoteViewLoadingState';

export const TagList: React.FC = () => {
    const tags = useRecoilValue(tagsState)
    const setNoteView = useSetRecoilState(noteViewState);
    const setNotesLoading = useSetRecoilState(noteViewLoadingState);

    const handleClick = (evt: any, tag: string) => {
        evt.preventDefault();
        setNotesLoading(true);

        fetch(`/api/v1/notes/tags?tags=${tag}`).then(res => res.json())
            .then(({data}) => setNoteView(data));
        setNotesLoading(false);
    }

    return (
        <div className="tag-list">
            <h2>Tags</h2>
            <ul>
                {tags.map(tag => <li onClick={evt => handleClick(evt, tag)}>{tag}</li>)}
            </ul>
        </div>
    )
}
