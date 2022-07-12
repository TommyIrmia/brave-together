import React from 'react'
import { canvasService } from '../services/canvas.service'
import { ChosenSubOption } from './ChosenSubOption'
import { stillImgs, natureImgs } from '../imgs/consts'

export const ImgOptions = ({ options, setTemplate, template }) => {

    const setImg = (src) => {
        const imgFromTemp = template.imgs.find(img => img.src === src)
        if (!imgFromTemp) addImg(src)
        else removeImg(imgFromTemp)

    }

    const addImg = (src) => {
        const img = canvasService.getImg(src)
        setTemplate((prevTemplate) =>
        ({
            ...prevTemplate,
            imgs: [...prevTemplate.imgs, img]
        }))
    }

    const removeImg = (img) => {
        setTemplate((prevTemplate) => {
            const imgs = prevTemplate.imgs.filter(i => i.src !== img.src)
            return {
                ...prevTemplate,
                imgs
            }
        })
    }

    const isImgChosen = (src) => {
        return template.imgs.find((i) => i.src === src)
    }

    const DynamicCmp = () => {
        const option = options.find((option) => option.isChosen)
        switch (option.type) {
            case 'nature':
                return natureImgs.map(img => (
                    <div key={img} onClick={() => setImg(img)}>
                        <img src={require('../' + img).default} />
                        <ChosenSubOption isChosen={isImgChosen(img)} />
                    </div>
                ))
            case 'still':
                return stillImgs.map((img, idx) => (
                    <div key={idx} onClick={() => setImg(img)}>
                        <img src={require('../' + img).default} />
                        <ChosenSubOption isChosen={isImgChosen(img)} />
                    </div>
                ))
            case 'symbol':
                return stillImgs.map(img => (
                    <div key={img}>
                        {/* <img src={require('../' + drawing).default} /> */}
                    </div>
                ))
        }
    }


    return (
        <DynamicCmp />
    )
}
