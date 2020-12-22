import React from 'react'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

interface Props {

}

export const CommentBlock: React.FC<Props> = () => {
    return (
        <div className="note-row">
            <SimpleMDE />
        </div>
    )
}

// todo: add an EasyMDE textarea within this component
// https://www.npmjs.com/package/react-simplemde-editor