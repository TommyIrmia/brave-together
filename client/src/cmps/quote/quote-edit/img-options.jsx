import React from 'react'

import { canvasService } from '../../../services/canvas.service'
import { stillImgs, natureImgs } from '../../../consts/imgs.consts'

import { OptionPreview } from './option-preview'

export const ImgOptions = ({ options, onUpdateQuote, quote }) => {

    const onToggleImg = (src) => {
        if (isImgChosen(src)) removeImg(src)
        else addImg(src)
    }

    const addImg = (src) => {
        const img = canvasService.getImg(src)
        const quoteToUpdate = {
            ...quote,
            imgs: [...quote.imgs, img]
        }
        onUpdateQuote(quoteToUpdate)
    }

    const removeImg = (imgSrc) => {
        const imgs = quote.imgs.filter(i => i.src !== imgSrc)
        const quoteToUpdate = { ...quote, imgs }
        onUpdateQuote(quoteToUpdate)
    }

    const isImgChosen = (src) => {
        return quote.imgs.find((i) => i.src === src)
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


