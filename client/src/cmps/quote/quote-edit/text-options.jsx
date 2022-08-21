import React from 'react'

import { canvasService } from '../../../services/canvas.service'
import { colors, fonts, txtSizes } from '../../../consts/consts'

import { OptionPreview } from './option-preview'
import { ChosenSubOption } from './chosen-sub-option'

export const TextOptions = ({ options, onUpdateQuote, quote }) => {

    const setFontStyle = (type, attr) => {
        const pos = canvasService.getTxtPos()
        const quoteToUpdate = {
            ...quote,
            txt: {
                ...quote.txt,
                [type]: attr,
                pos
            }
        }
        onUpdateQuote(quoteToUpdate)
    }


    const chosenOption = options.find((option) => option.isChosen)
    switch (chosenOption.type) {
        case 'font':
            return fonts.map(font => (
                <div key={font} onClick={() => setFontStyle('fontFamily', font)}
                    className="text-option" style={{ fontFamily: font }}>
                    <span>T</span>
                    <ChosenSubOption isChosen={quote?.txt.fontFamily === font} />
                    <span>T</span>
                </div>
            ))

        case 'color':
            return colors.map(color => (
                <OptionPreview
                    key={color}
                    onSetOption={() => setFontStyle('fontColor', color)}
                    style={{ backgroundColor: color }}
                    isChosen={quote?.txt.fontColor === color}
                />
            ))

        case 'size':
            return txtSizes.map(size => (
                <OptionPreview
                    key={size}
                    className="txt-size"
                    onSetOption={() => setFontStyle('fontSize', size + 7)}
                    style={{ fontSize: (size + 3) + 'px' }}
                    isChosen={+quote?.txt.fontSize === +size + 7}
                >
                    אבג
                </OptionPreview>
            ))
    }
}

