// renders Anki models as React Components
import React from 'react'
import { NoteInterface } from '../interfaces/NoteInterface';
import { CardTemplateInterface } from './../interfaces/CardTemplate';
import { NoteModel } from './../interfaces/NoteModel';

interface Props {
    note: NoteInterface;
    model: NoteModel;
    template: CardTemplateInterface;
}

// everything else
export const RenderAnkiTemplate: React.FC<Props> = ({note, model, template}) => {
    return (
        <div className="card">
            Your card here
        </div>
    )
}

// cloze helper function, gets called by the first one to handle clozes
export const RenderAnkiClozeTemplate: React.FC<Props> = ({note, model, template}) => {
    return (
        <div className="card">
            Your cloze card here
        </div>
    )
}
