import React from 'react'
import { ChosenSubOption } from './ChosenSubOption'
import { frames } from '../imgs/consts'


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
                frames.map(frame => (
                    <div key={frame} className="frame-option"
                        onClick={() => setFrame(frame)}>
                        <img alt="frame option" src={require('../' + frame).default} />
                        <ChosenSubOption isChosen={template.frame === frame} />
                    </div>
                ))
            }
        </>
    )
}
