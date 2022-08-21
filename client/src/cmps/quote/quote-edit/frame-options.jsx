import React from 'react'
import { frames } from '../../../consts/imgs.consts'
import { OptionPreview } from './option-preview'

export const FrameOptions = ({ quote, onUpdateQuote }) => {

    const setFrame = (frame) => {
        const quoteToUpdate = {
            ...quote,
            frame
        }
        onUpdateQuote(quoteToUpdate)
    }

    return (
        <>
            <div className="no-frame-option" onClick={() => setFrame()}>
                ללא
                {!quote.frame && <div className="chosen-sub-option"></div>}
            </div>
            {
                frames.map((frame, idx) => (
                    <OptionPreview
                        key={frame}
                        className="frame-option"
                        onSetOption={() => setFrame(frame)}
                        imgSrc={frame}
                        isChosen={quote.frame === frame}
                    />
                ))
            }
        </>
    )
}
