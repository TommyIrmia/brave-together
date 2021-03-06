import React from 'react'

import { options } from '../../consts/consts'
import bgcImg from '../../assets/images/templateEdit/utils/bgc.png'
import bgc1Img from '../../assets/images/templateEdit/utils/bgc1.png'
import imgImg from '../../assets/images/templateEdit/utils/img.png'
import img1Img from '../../assets/images/templateEdit/utils/img1.png'
import frameImg from '../../assets/images/templateEdit/utils/frame.png'
import textImg from '../../assets/images/templateEdit/utils/text.png'



export const Options = ({ setOption, chosenOption }) => {

    const getChosenOption = (type) => {
        return options.find(option => option.type === type)
    }

    return (
        <div>
            <div className="options-container">

                <div className={'option ' + ((chosenOption.type === 'background') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('background'))}>
                    <div className="img-container">
                        <img className="bgc-img" src={bgcImg} alt="background" />
                        <img className="bgc1-img" src={bgc1Img} alt="background" />
                    </div>
                    רקע
                </div>

                <div className={'option ' + ((chosenOption.type === 'frame') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('frame'))}>
                    <div className="img-container">
                        <img className="frame-img" src={frameImg} alt="frames" />
                    </div>
                    מסגרת
                </div>

                <div className={'option ' + ((chosenOption.type === 'img') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('img'))}>
                    <div className="img-container">
                        <img className="img-img" src={imgImg} alt="imgs" />
                        <img className="img1-img" src={img1Img} alt="imgs" />
                    </div>
                    תמונות
                </div>

                <div className={'option ' + ((chosenOption.type === 'text') ? 'chosen' : '')}
                    onClick={() => setOption(getChosenOption('text'))}>
                    <div className="img-container">
                        <img className="text-img" src={textImg} alt="text" />
                    </div>
                    טקסט
                </div>

            </div>
        </div>
    )
}
