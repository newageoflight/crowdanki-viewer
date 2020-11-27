import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

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
    let renderedElems = model.tmpls.map((template) => (
        <RenderAnkiTemplate note={note} model={model} template={template} />
    ))
    
    let sliderElems = renderedElems.map((elem, idx) => (
        <Slide index={idx}>{elem}</Slide>
    ))

    return (
        <CarouselProvider naturalSlideHeight={80} naturalSlideWidth={120} totalSlides={model.tmpls.length}>
            <Slider>
                {sliderElems}
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
    )
}
