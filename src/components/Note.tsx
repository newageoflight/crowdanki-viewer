import React from 'react'
import ContentEditable from 'react-contenteditable';
import { NoteInterface } from '../interfaces/NoteInterface';
import { NoteModel } from './../interfaces/NoteModel';
import { CardCarousel } from './CardCarousel';
import { useRecoilState } from 'recoil';
import { noteStateFamily } from './../context/NoteStateFamily';
import { noteViewState } from './../context/NoteViewState';

interface Props {
    key: string;
    note: NoteInterface;
    model: NoteModel;
}

// TODO: consider creating a function to preprocess the HTML so that the image sources are redirected to public/deck/media

export const Note: React.FC<Props> = ({note, model}) => {
    // for some reason, using the key (which is equal to the note guid) causes it to crash
    const [noteState, setNoteState] = useRecoilState(noteStateFamily(note.guid));
    const [noteListState, setNoteListState] = useRecoilState(noteViewState);
    // TODO: add onChange hooks for the contentEditable divs so that the changes are propagated back to the app state
    const handleFieldChange = (idx, evt) => {
        let newState = {...noteState};
        // you can't assign arrays directly in strict mode
        let newFields = newState.fields.slice();
        newFields[idx] = evt.currentTarget.innerHTML;
        newState.fields = newFields;
        setNoteState(newState);
    }

    const handleTagChange = (evt) => {
        let newState = {...noteState};
        newState.tags = evt.currentTarget.textContent.split(" ");
        setNoteState(newState);
    }

    const deleteNote = (evt) => {
        let newListState = noteListState.filter(n => n.guid !== note.guid);
        setNoteListState(newListState);
    }

    return (
        <div className="row note-item">
            <div className="col note-fields">
                {// edit fields in the left column
                noteState.fields.map((field, idx) => (
                    <div className="field">
                        <div className="field-label">
                            {model.flds[idx].name}
                        </div>
                        <ContentEditable onChange={e => handleFieldChange(idx, e)} html={field} className="field-content" />
                    </div>
                ))}
                <div className="tags">
                    <div className="tag-label">
                        Tags
                    </div>
                    <ContentEditable onChange={handleTagChange} html={noteState.tags.join(" ")} className="tag-content" />
                </div>
                <div>
                    <button className="note-delete" onClick={deleteNote}>Delete note</button>
                </div>
            </div>
            <div className="col note-view">
                <CardCarousel key={noteState.guid} note={noteState} model={model}/>
            </div>
        </div>
    )
}