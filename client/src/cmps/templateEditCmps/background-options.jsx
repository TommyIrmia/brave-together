import React from 'react'
import { ChosenSubOption } from './chosen-sub-option'

import { photos, drawings, patterns } from '../../consts/imgs.consts'
import {colors} from '../../consts/consts'


export const BackgroundOptions = ({ setTemplate, template, options }) => {

    const setBgc = (type, attr) => {
        setTemplate((prevTemplate) =>
        ({
            ...prevTemplate,
            background: { type, attr }
        }))
    }

    const DynamicCmp = () => {
        const option = options.find((option) => option.isChosen)

        switch (option.type) {
            case 'color':
                return colors.map(color => (
                    <div key={color} style={{ backgroundColor: color }}
                        name="color" onClick={() => setBgc('color', color)}>
                        <ChosenSubOption isChosen={template?.background.attr === color} />
                    </div >
                ))

            case 'pattern':
                return patterns.map(pattern =>
                (<div key={pattern}
                    name="img" onClick={() => setBgc('img', pattern)}>
                    <img src={pattern} />
                    <ChosenSubOption isChosen={template?.background.attr === pattern} />
                </div>
                ))

            case 'drawing':
                return drawings.map(drawing => (
                    <div key={drawing}
                        name="img" onClick={() => setBgc('img', drawing)}>
                        <img src={drawing} />
                        <ChosenSubOption isChosen={template?.background.attr === drawing} />
                    </div>
                ))

            case 'photo':
                return photos.map(photo => (
                    <div key={photo}
                        name="img" onClick={() => setBgc('img', photo)} >
                        <img src={photo} />
                        <ChosenSubOption isChosen={template?.background.attr === photo} />
                    </div>
                ))
        }

    }

    return (
        <DynamicCmp />
    )
}
