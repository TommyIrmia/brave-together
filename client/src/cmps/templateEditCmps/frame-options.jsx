import React from 'react'
import { ChosenSubOption } from './chosen-sub-option'
import { frames } from '../../consts/imgs.consts'

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
                {!template.frame && <ChosenSubOption isChosen={true} />}
            </div>
            {
                frames.map((frame, idx) => (
                    <div key={frame} className="frame-option"
                        onClick={() => setFrame(frame)}>
                        <img alt="frame option" src={frame} />
                        <ChosenSubOption isChosen={template.frame === frame} />
                    </div>
                ))
            }
        </>
    )
}
