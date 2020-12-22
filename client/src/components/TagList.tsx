import React from 'react'
import { tagsState } from './../context/TagsState';
import { useRecoilValue } from 'recoil';
import { Tag } from './Tag';

export const TagList: React.FC = () => {
    const tags = useRecoilValue(tagsState)

    return (
        <div className="tag-list">
            <h2>Tags</h2>
            <ul>
                {tags.map(tag => <Tag key={tag.name} item={tag} fullName={tag.name} level={0} />)}
            </ul>
        </div>
    )
}
