import React from 'react'

import { canvasService } from '../../../services/canvas.service'
import { stillImgs, natureImgs } from '../../../consts/imgs.consts'

import { OptionPreview } from './option-preview'

export const ImgOptions = ({ options, setTemplate, template }) => {

    const onToggleImg = (src) => {
        if (isImgChosen(src)) removeImg(src)
        else addImg(src)
    }

    const addImg = (src) => {
        const img = canvasService.getImg(src)
        setTemplate((prevTemplate) =>
        ({
            ...prevTemplate,
            imgs: [...prevTemplate.imgs, img]
        }))
    }

    const removeImg = (imgSrc) => {
        const imgs = template.imgs.filter(i => i.src !== imgSrc)
        setTemplate((prevTemplate) => ({ ...prevTemplate, imgs }))
    }

    const isImgChosen = (src) => {
        return template.imgs.find((i) => i.src === src)
    }

    // const DynamicCmp = () => {
    const chosenOption = options.find((option) => option.isChosen)
    switch (chosenOption.type) {
        case 'nature':
            return natureImgs.map(img => (
                <OptionPreview
                    key={img}
                    onSetOption={() => onToggleImg(img)}
                    imgSrc={img}
                    isChosen={isImgChosen(img)}
                />
            ))
        case 'still':
            return stillImgs.map((img, idx) => (
                <OptionPreview
                    key={img}
                    onSetOption={() => onToggleImg(img)}
                    imgSrc={img}
                    isChosen={isImgChosen(img)}
                />
            ))
        case 'symbol':
            return stillImgs.map(img => (
                <div key={img}>
                </div>
            ))
    }
}


