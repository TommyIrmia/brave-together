import React from 'react'

import { photos, drawings, patterns } from '../../../consts/imgs.consts'
import { colors } from '../../../consts/consts'

import { OptionPreview } from './option-preview'


export const BackgroundOptions = ({ onUpdateQuote, quote, options }) => {

    const setBgc = (type, attr) => {
        const quoteToUpdate = {
            ...quote,
            background: { type, attr }
        }
        console.log(quoteToUpdate);
        onUpdateQuote(quoteToUpdate)
    }

    const chosenOption = options.find((option) => option.isChosen)

    switch (chosenOption.type) {
        case 'color':
            return colors.map(color => (
                <OptionPreview
                    key={color}
                    style={{ backgroundColor: color }}
                    onSetOption={() => setBgc('color', color)}
                    isChosen={quote?.background.attr === color}
                />
            ))

        case 'pattern':
            return patterns.map(pattern => (
                <OptionPreview
                    key={pattern}
                    imgSrc={pattern}
                    onSetOption={() => setBgc('img', pattern)}
                    isChosen={quote?.background.attr === pattern}
                />
            ))

        case 'drawing':
            return drawings.map(drawing => (
                <OptionPreview
                    key={drawing}
                    imgSrc={drawing}
                    onSetOption={() => setBgc('img', drawing)}
                    isChosen={quote?.background.attr === drawing}
                />
            ))

        case 'photo':
            return photos.map(photo => (
                <OptionPreview
                    key={photo}
                    imgSrc={photo}
                    onSetOption={() => setBgc('img', photo)}
                    isChosen={quote?.background.attr === photo}
                />
            ))
    }
}

