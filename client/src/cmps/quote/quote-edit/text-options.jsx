import React from 'react'

import { canvasService } from '../../../services/canvas.service'
import { colors, fonts, txtSizes } from '../../../consts/consts'

import { OptionPreview } from './option-preview'
import { ChosenSubOption } from './chosen-sub-option'

export const TextOptions = ({ options, setTemplate, template }) => {

    const setFontStyle = (type, attr) => {
        const pos = canvasService.getTxtPos()
        setTemplate((prevTemplate) =>
        ({
            ...prevTemplate,
            txt: {
                ...prevTemplate.txt,
                [type]: attr,
                pos
            }
        }))
    }


    const chosenOption = options.find((option) => option.isChosen)
    switch (chosenOption.type) {
        case 'font':
            return fonts.map(font => (
                <div key={font} onClick={() => setFontStyle('fontFamily', font)}
                    className="text-option" style={{ fontFamily: font }}>
                    <span>T</span>
                    <ChosenSubOption isChosen={template?.txt.fontFamily === font} />
                    <span>T</span>
                </div>
            ))

        case 'color':
            return colors.map(color => (
                <OptionPreview
                    key={color}
                    onSetOption={() => setFontStyle('fontColor', color)}
                    style={{ backgroundColor: color }}
                    isChosen={template?.txt.fontColor === color}
                />
            ))

        case 'size':
            return txtSizes.map(size => (
                <OptionPreview
                    key={size}
                    className="txt-size"
                    onSetOption={() => setFontStyle('fontSize', size + 7)}
                    style={{ fontSize: (size + 3) + 'px' }}
                    isChosen={+template?.txt.fontSize === +size + 7}
                >
                    אבג
                </OptionPreview>
            ))
    }
}

