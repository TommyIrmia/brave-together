import React from 'react'
import { frames } from '../../../consts/imgs.consts'
import { OptionPreview } from './option-preview'

export const FrameOptions = ({ template, setTemplate }) => {

    const setFrame = (frame) => {
        setTemplate((prevTemplate) => ({
            ...prevTemplate,
            frame
        }))
    }

    return (
        <>
            <div className="no-frame-option" onClick={() => setFrame()}>
                ללא
                {!template.frame && <div className="chosen-sub-option"></div>}
            </div>
            {
                frames.map((frame, idx) => (
                    <OptionPreview
                        key={frame}
                        className="frame-option"
                        onSetOption={() => setFrame(frame)}
                        imgSrc={frame}
                        isChosen={template.frame === frame}
                    />
                ))
            }
        </>
    )
}
