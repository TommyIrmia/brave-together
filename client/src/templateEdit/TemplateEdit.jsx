import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import { Options } from './cmps/Options.jsx'
import { options } from './imgs/consts'
import { BackgroundOptions } from './cmps/BackgroundOptions.jsx'
import { FrameOptions } from './cmps/FrameOptions.jsx'
import { ImgOptions } from './cmps/ImgOptions.jsx'
import { TextOptions } from './cmps/TextOptions.jsx'
import { usePrevious } from './hooks/usePrevious'
import { SubOptions } from './cmps/SubOptions.jsx'
import { Share } from '../share/share'

import backImg from './imgs/utils/back.png'
import downloadImg from './imgs/utils/download.png'

import { canvasService } from './services/canvas.service'
import { storageService } from './services/storageService'
import './template-edit2.scss'


export const TemplateEdit = () => {

    const [isShareModalOpen, setIsShareModal] = useState(false)
    const [option, setOption] = useState(options[0])
    const [template, setTemplate] = useState(null)
    const prevTemplate = usePrevious(template)

    const location = useLocation()
    const history = useHistory()

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const dragRef = useRef({ isDrag: false, startPos: null, elClicked: null })
    const downloadRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        setCanvas()
        const txt = location.state?.txt
        if (!txt) history.push('/')
        setTemplate(canvasService.getTemplate(txt))

        return () => {
            canvasRef.current = null
            ctxRef.current = null
        }
    }, [])

    useEffect(() => {
        if (!template || !canvasRef.current) return
        removeListeners(canvasRef.current)
        addListeners(canvasRef.current)
        drawTemplate()
        storageService.saveTempToStorage(template)

        return () => {
            removeListeners(canvasRef.current)
        }
    }, [template])

    const setCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        ctxRef.current = canvas.getContext('2d');
        canvas.width = containerRef.current.offsetWidth
        canvas.height = containerRef.current.offsetHeight
    }

    const resizeCanvas = () => {
        setCanvas()
        drawTemplate()
    }

    const drawTemplate = async () => {

        const { txt, background, frame, imgs } = template
        const { isDrag } = dragRef.current
        const canvas = canvasRef.current
        const ctx = ctxRef.current

        isDrag && ctx.clearRect(0, 0, canvas.width, canvas.height);

        (background.type === 'color') && canvasService.drawBgcColor(canvas, ctx, background.attr);
        (background.type === 'img') && await canvasService.drawBgcImg(canvas, ctx, background.attr);
        (frame) && await canvasService.drawFrame(canvas, ctx, frame);
        (imgs.length) && await canvasService.drawImgs(ctx, imgs);
        (txt) && canvasService.drawText(canvas, ctx, shouldRecomputeTxtWidth(), txt);
    }

    const onToggleShareModal = () => {
        setIsShareModal(!isShareModalOpen)
    }

    const shouldRecomputeTxtWidth = () => {
        if (dragRef.current.isDrag) return false
        if (!prevTemplate) return true
        if (template.txt.fontColor !== prevTemplate.txt.fontColor) return false
        return JSON.stringify(template.txt) !== JSON.stringify(prevTemplate.txt)
    }

    const addListeners = (canvas) => {
        if (!canvas) return
        const funcs = { onDown, onMove, onUp }
        canvasService.addMouseListeners(canvas, funcs);
        canvasService.addTouchListeners(canvas, funcs);
        window.addEventListener('resize', resizeCanvas);
        document.querySelector('body').style.overflow = 'hidden';
    }

    const removeListeners = (canvas) => {
        window.removeEventListener('resize', resizeCanvas)
        document.querySelector('body').style.overflow = 'scroll'
        if (!canvas) return
        const funcs = { onDown, onMove, onUp }
        canvasService.removeMouseListeners(canvas, funcs)
        canvasService.removeTouchListeners(canvas, funcs)

    }

    const onDown = (ev) => {
        const pos = canvasService.getEvPos(ev);
        const elClicked = canvasService.isElClicked(pos, template)
        if (!elClicked) return;
        dragRef.current = { isDrag: true, startPos: pos, elClicked };
        canvasRef.current.style.cursor = 'grabbing';
    }

    const onMove = (ev) => {
        const { startPos, isDrag, elClicked } = dragRef.current
        if (!isDrag) return;

        const pos = canvasService.setElPos(ev, { ...elClicked }, startPos)
        dragRef.current.startPos = pos;
        drawTemplate()
    }

    const onUp = () => {
        dragRef.current.isDrag = false
        dragRef.current.elClicked = null
        canvasRef.current.style.cursor = 'grab'
        storageService.saveTempToStorage(template)
    }

    const onDownloadImg = () => {
        const image = canvasRef.current.toDataURL("image/png")
        downloadRef.current.href = image;
    }

    const DynamicOptions = () => {
        const props = {
            options: option.subTypes || null,
            template,
            setTemplate
        }
        switch (option.type) {
            case 'background':
                return <BackgroundOptions {...props} />
            case 'frame':
                return <FrameOptions {...props} />
            case 'img':
                return <ImgOptions {...props} />
            case 'text':
                return <TextOptions {...props} />
            default:
                return <></>
        }
    }

    return (
        <section className="template-edit-container">

            <Share canvas={canvasRef.current} isOpen={isShareModalOpen} onClose={onToggleShareModal} />

            <div className="canvas-container" ref={containerRef}>
                <div className="btns-container">
                    <button onClick={() => history.push(`/testimony/${location.state.storyId}`)}>
                        <div className="img-container">
                            <img src={backImg} alt="back" />
                        </div>
                        חזרה לסיפור
                    </button>

                    <a onClick={onDownloadImg} ref={downloadRef} target="_blank" download="Brave-Together.jpg" title="Brave-Together" href='#'>
                        <button>
                            <div className="img-container">
                                <img src={downloadImg} alt="download" />
                            </div>
                            שמור
                        </button>
                    </a>
                </div>


                <canvas ref={canvasRef}></canvas>

                <div className="btns-container-2">
                    <button className="more-btn">לעיצובים נוספים</button>
                    <button className="share-btn" onClick={onToggleShareModal}>שתף</button>
                </div>
            </div>

            <div className="tool-bar-container">

                <SubOptions options={option.subTypes} setOption={setOption}>
                    <DynamicOptions />
                </SubOptions>

                <Options setOption={setOption} chosenOption={option} />
            </div>
        </section>
    )
}
