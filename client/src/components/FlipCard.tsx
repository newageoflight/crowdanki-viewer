import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';

interface Props {
    qHTML: string;
    aHTML: string;
    style: string;
}

export const FlipCard: React.FC<Props> = ({qHTML, aHTML, style}) => {
    const [flipped, setFlipped] = useState(false);
    const handleClick = () => {
        setFlipped(!flipped);
    }

    let qInner = {__html: qHTML}
    let aInner = {__html: aHTML}
    let styleInner = {__html: style}

    return (
        <div className="card-sides">
            <style dangerouslySetInnerHTML={styleInner}></style>
            <ReactCardFlip isFlipped={flipped} flipDirection="vertical">
                <div className="card" dangerouslySetInnerHTML={qInner}>
                </div>
                <div className="card" dangerouslySetInnerHTML={aInner}>
                </div>
            </ReactCardFlip>
            <br/>
            <button className="card-flipper" onClick={handleClick}>{flipped ? "Show Question" : "Show Answer"}</button>
        </div>
    )
}
