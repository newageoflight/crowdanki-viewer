import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


import { NoteInterface } from './../interfaces/NoteInterface';
import { NoteModel } from './../interfaces/NoteModel';
// import { RenderAnkiTemplate } from './AnkiTemplate';
import { RenderAnkiTemplateAsObjects } from './../utils/AnkiRender';
import { FlipCard } from './FlipCard';

interface Props {
    key: string;
    note: NoteInterface;
    model: NoteModel;
}

export const CardCarousel: React.FC<Props> = ({note, model}) => {
    // none of the carousel components actually work the way I want them to...
    let renderedElems = model.tmpls.map((template) => 
        RenderAnkiTemplateAsObjects(note, model, template)
        // <RenderAnkiTemplate note={note} model={model} template={template} />
    )
    
    let sliderElems = renderedElems.flat().map((elem, idx) => (
        <FlipCard key={idx} {...elem} />
    ))

    return (
        <Carousel showThumbs={false}>
            {sliderElems}
        </Carousel>
    )
}
