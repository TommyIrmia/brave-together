import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ToolBarOptions } from '../../cmps/quote/quote-edit/tool-bar-options'
import { DynamicOptions } from '../../cmps/quote/quote-edit/dynamic-options'
import { usePrevious } from '../../hooks/usePrevious'
import { OptionsContainer } from '../../cmps/quote/quote-edit/options-container'
import { Share } from '../../cmps/share/share'

import backImg from '../../assets/images/templateEdit/utils/back.png'
import downloadImg from '../../assets/images/templateEdit/utils/download.png'
import { options } from '../../consts/consts'

import { canvasService } from '../../services/canvas.service'
import { storageService } from '../../services/storage.service'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'


export const QuoteEdit = () => {

    const [isShareModalOpen, setIsShareModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState(options[0])
    const [template, setTemplate] = useState(null)
    const prevTemplate = usePrevious(template)

    const location = useLocation()
    const navigate = useNavigate()

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const dragRef = useRef({ isDrag: false, startPos: null, elClicked: null })
    const downloadRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        setCanvas()
        const txt = location.state?.txt
        if (!txt) navigate('/')
        setTemplate(canvasService.getTemplate(txt))

        return () => {
            canvasRef.current = null
            ctxRef.current = null
        }
    }, [])

    useEffectUpdate(() => {
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
        if (!canvas) return //Go to unsupported page
        ctxRef.current = canvas.getContext('2d');
        canvas.width = containerRef.current.offsetWidth
        canvas.height = containerRef.current.offsetHeight
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
        const shouldCompute = canvasService.shouldRecomputeTxtWidth(dragRef.current.isDrag, template, prevTemplate);
        (txt) && canvasService.drawText(canvas, ctx, shouldCompute, txt);
    }

    const onToggleShareModal = () => {
        setIsShareModal(!isShareModalOpen)
    }

    const addListeners = (elCanvas) => {
        if (!elCanvas) return
        const funcs = { onDown, onMove, onUp }
        canvasService.addMouseListeners(elCanvas, funcs);
        canvasService.addTouchListeners(elCanvas, funcs);
        window.addEventListener('resize', resizeCanvas);
        document.querySelector('body').style.overflow = 'hidden';
    }

    const removeListeners = (elCanvas) => {
        window.removeEventListener('resize', resizeCanvas)
        document.querySelector('body').style.overflow = 'scroll'
        if (!elCanvas) return
        const funcs = { onDown, onMove, onUp }
        canvasService.removeMouseListeners(elCanvas, funcs)
        canvasService.removeTouchListeners(elCanvas, funcs)

    }

    const onDown = (ev) => {
        const pos = canvasService.getEvPos(ev);
        const elClicked = canvasService.getClickedEl(pos, template)
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

    const resizeCanvas = () => {
        setCanvas()
        drawTemplate()
    }


    return (
        <section className="template-edit-container">

            <Share canvas={canvasRef.current} isOpen={isShareModalOpen} onClose={onToggleShareModal} />

            <div className="canvas-container" ref={containerRef}>
                <div className="btns-container">
                    <button onClick={() => navigate(`/testimony/${location.state.storyId}`)}>
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

            <section className="tool-bar-container">
                <OptionsContainer options={selectedOption.subTypes} setOption={setSelectedOption}>
                    <DynamicOptions
                        selectedOption={selectedOption}
                        options={selectedOption.subTypes || null}
                        template={template}
                        setTemplate={setTemplate}
                    />
                </OptionsContainer>

                <ToolBarOptions setOption={setSelectedOption} chosenOption={selectedOption} />
            </section>
        </section>
    )
}
