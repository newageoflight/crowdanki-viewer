import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { NoteInterface } from './../interfaces/NoteInterface';
import { NoteModel } from './../interfaces/NoteModel';
import { RenderAnkiTemplate } from './AnkiTemplate';

interface Props {
    key: string;
    note: NoteInterface;
    model: NoteModel;
}

export const CardCarousel: React.FC<Props> = ({note, model}) => {
    // TODO: render note with templates

    return (
        <Carousel showThumbs={false}>
            {model.tmpls.map((template) => (
                <RenderAnkiTemplate note={note} model={model} template={template} />
            ))}
        </Carousel>
    )
}
