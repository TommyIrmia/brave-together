import React from 'react'

import { defaultToolbarOptions } from '../../../consts/consts'
import { toolBarImgs } from '../../../consts/imgs.consts'

const { addImg1, addImg2, addBgc1, addBgc2, addTxt, addFrame } = toolBarImgs

console.log(addImg1);
export const ToolBarOptions = ({ setOption, chosenOption }) => {

    const getChosenOption = (type) => {
        return defaultToolbarOptions.find(option => option.type === type)
    }

    return (
        <div>
            <div className="options-container">

                <div className={'option ' + ((chosenOption.type === 'background') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('background'))}>
                    <div className="img-container">
                        <img className="bgc-img" src={addBgc1} alt="background" />
                        <img className="bgc1-img" src={addBgc2} alt="background" />
                    </div>
                    רקע
                </div>

                <div className={'option ' + ((chosenOption.type === 'frame') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('frame'))}>
                    <div className="img-container">
                        <img className="frame-img" src={addFrame} alt="frames" />
                    </div>
                    מסגרת
                </div>

                <div className={'option ' + ((chosenOption.type === 'img') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('img'))}>
                    <div className="img-container">
                        <img className="img-img" src={addImg1} alt="imgs" />
                        <img className="img1-img" src={addImg2} alt="imgs" />
                    </div>
                    תמונות
                </div>

                <div className={'option ' + ((chosenOption.type === 'text') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('text'))}>
                    <div className="img-container">
                        <img className="text-img" src={addTxt} alt="text" />
                    </div>
                    טקסט
                </div>

            </div>
        </div>
    )
}
