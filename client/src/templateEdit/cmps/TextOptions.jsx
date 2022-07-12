import React from 'react'
import { canvasService } from '../services/canvas.service'
import { ChosenSubOption } from './ChosenSubOption'
import { colors, fonts, txtSizes } from '../imgs/consts'

export const TextOptions = ({ options, setTemplate, template }) => {

    const setFontStyle = (type, attr) => {
        const pos = canvasService.getTxtPos()
        setTemplate((prevTemplate) =>
        ({
            ...prevTemplate,
            txt: { ...prevTemplate.txt, [type]: attr, pos }
        }))
    }


    const DynamicCmp = () => {
        const option = options.find((option) => option.isChosen)
        switch (option.type) {
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
                    <div key={color} onClick={() => setFontStyle('fontColor', color)}
                        style={{ backgroundColor: color }}>
                        <ChosenSubOption isChosen={template?.txt.fontColor === color} />
                    </div>
                ))

            case 'size': 
                return txtSizes.map(size => (
                    <div key={size} className="txt-size"
                        style={{ fontSize: (size + 3) + 'px' }}
                        onClick={() => setFontStyle('fontSize', size)}>
                        אבג
                        <ChosenSubOption isChosen={+template?.txt.fontSize === +size} />
                    </div>
                ))
        }
    }

    return (
        <DynamicCmp />
    )
}
