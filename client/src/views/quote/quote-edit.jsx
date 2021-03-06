import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Options } from '../../cmps/templateEditCmps/Options'
import { options } from '../../consts/consts'
import { BackgroundOptions } from '../../cmps/templateEditCmps/background-options'
import { FrameOptions } from '../../cmps/templateEditCmps/frame-options'
import { ImgOptions } from '../../cmps/templateEditCmps/img-options'
import { TextOptions } from '../../cmps/templateEditCmps/text-options'
import { usePrevious } from '../../hooks/usePrevious'
import { SubOptions } from '../../cmps/templateEditCmps/sub-options'
import { Share } from '../../cmps/share/share'

// import backImg from '../assets/images/back.png'
import downloadImg from '../../assets/images/templateEdit/utils/download.png'

import { canvasService } from '../../services/canvas.service'
import { storageService } from '../../services/storage-service'


export const QuoteEdit = () => {

    const [isShareModalOpen, setIsShareModal] = useState(false)
    const [option, setOption] = useState(options[0])
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
                    <button onClick={() => navigate(`/testimony/${location.state.storyId}`)}>
                        <div className="img-container">
                            {/* <img src={backImg} alt="back" /> */}
                        </div>
                        ???????? ????????????
                    </button>

                    <a onClick={onDownloadImg} ref={downloadRef} target="_blank" download="Brave-Together.jpg" title="Brave-Together" href='#'>
                        <button>
                            <div className="img-container">
                                <img src={downloadImg} alt="download" />
                            </div>
                            ????????
                        </button>
                    </a>
                </div>


                <canvas ref={canvasRef}></canvas>

                <div className="btns-container-2">
                    <button className="more-btn">???????????????? ????????????</button>
                    <button className="share-btn" onClick={onToggleShareModal}>??????</button>
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
