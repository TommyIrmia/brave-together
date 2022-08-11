import React from 'react'
import { canvasService } from '../../services/canvas.service'
import { ChosenSubOption } from './chosen-sub-option'
import { stillImgs, natureImgs } from '../../consts/imgs.consts'

export const ImgOptions = ({ options, setTemplate, template }) => {

    const toggleImg = (src) => {
        const img = template.imgs.find(img => img.src === src)
        if (img) removeImg(src)
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
        console.log(imgSrc);
        const imgs = template.imgs.filter(i => i.src !== imgSrc)
        setTemplate((prevTemplate) => ({ ...prevTemplate, imgs }))
    }

    const isImgChosen = (src) => {
        return template.imgs.find((i) => i.src === src)
    }

    // const DynamicCmp = () => {
    const option = options.find((option) => option.isChosen)
    switch (option.type) {
        case 'nature':
            return natureImgs.map(img => (
                <div key={img} onClick={() => toggleImg(img)}>
                    <img src={img} />
                    <ChosenSubOption isChosen={isImgChosen(img)} />
                </div>
            ))
        case 'still':
            return stillImgs.map((img, idx) => (
                <div key={idx} onClick={() => toggleImg(img)}>
                    <img src={img} />
                    <ChosenSubOption isChosen={isImgChosen(img)} />
                </div>
            ))
        case 'symbol':
            return stillImgs.map(img => (
                <div key={img}>
                </div>
            ))
    }
}


//     return (
//         <DynamicCmp />
//     )
// }
