import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { CardTemplateInterface } from '../interfaces/CardTemplate';
import { NoteInterface } from './../interfaces/NoteInterface';

interface Props {
    key: string;
    note: NoteInterface;
    templates: Array<CardTemplateInterface>;
}

export const CardCarousel: React.FC<Props> = ({note, templates}) => {
    // TODO: render note with templates

    return (
        <Carousel>
            <div>
                <h3>First template</h3>
            </div>
            <div>
                <h3>Second template</h3>
            </div>
        </Carousel>
    )
}
