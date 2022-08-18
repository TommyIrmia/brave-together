import { useLocation, useNavigate } from 'react-router-dom'
import { useRef } from 'react'

import { canvasService } from '../../../services/canvas.service'

import downloadImg from '../../../assets/images/templateEdit/utils/download.png'
import backImg from '../../../assets/images/templateEdit/utils/back.png'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { usePrevious } from './../../../hooks/usePrevious';

export const CanvasContainer = ({ canvasRef, ctxRef, onUpdateQuote, onToggleShareModal }) => {

    const { quote } = useSelector(globalState => globalState.quoteModule)
    const prevQuote = usePrevious(quote)

    const navigate = useNavigate()
    const location = useLocation()

    const containerRef = useRef(null)
    const dragRef = useRef({ isDrag: false, startPos: null, elClicked: null })
    const downloadRef = useRef(null)


    useEffect(() => {
        if (!quote || !canvasRef.current) return
        setCanvas()
        const funcs = { onDown, onMove, onUp }
        removeListeners(funcs)
        addListeners(funcs)
        drawTemplate()
        return () => {
            removeListeners(funcs)
        }
    }, [quote])


    const drawTemplate = async () => {
        const { txt, background, frame, imgs } = quote
        const { isDrag } = dragRef.current
        const canvas = canvasRef.current
        const ctx = ctxRef.current

        isDrag && ctx.clearRect(0, 0, canvas.width, canvas.height);

        (background.type === 'color') && canvasService.drawBgcColor(canvas, ctx, background.attr);
        (background.type === 'img') && await canvasService.drawBgcImg(canvas, ctx, background.attr);
        (frame) && await canvasService.drawFrame(canvas, ctx, frame);
        (imgs.length) && await canvasService.drawImgs(ctx, imgs);
        const shouldCompute = canvasService.shouldRecomputeTxtWidth(dragRef.current.isDrag, quote, prevQuote);
        (txt) && canvasService.drawText(canvas, ctx, shouldCompute, txt);
    }

    const onDown = (ev) => {
        const pos = canvasService.getEvPos(ev)
        const elClicked = canvasService.getClickedEl(pos, quote)
        if (!elClicked) return
        dragRef.current = { isDrag: true, startPos: pos, elClicked };
        canvasRef.current.style.cursor = 'grabbing'
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
        onUpdateQuote(quote)
    }

    const addListeners = (funcs) => {
        window.addEventListener('resize', resizeCanvas);
        document.querySelector('body').style.overflow = 'hidden';
        canvasService.addMouseListeners(canvasRef.current, funcs);
        canvasService.addTouchListeners(canvasRef.current, funcs);
    }

    const removeListeners = (funcs) => {
        window.removeEventListener('resize', resizeCanvas)
        document.querySelector('body').style.overflow = 'scroll'
        if (!canvasRef.current) return
        canvasService.removeMouseListeners(canvasRef.current, funcs)
        canvasService.removeTouchListeners(canvasRef.current, funcs)

    }

    const resizeCanvas = () => {
        setCanvas()
        drawTemplate()
    }

    const setCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return //Go to unsupported page
        ctxRef.current = canvas.getContext('2d');
        canvas.width = containerRef.current.offsetWidth
        canvas.height = containerRef.current.offsetHeight
    }

    const onDownloadImg = () => {
        const image = canvasRef.current.toDataURL("image/png")
        downloadRef.current.href = image;
    }


    return <div className="canvas-container" ref={containerRef}>
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
        
        <span>
            Everything here is the local code,
            changes I made! and commited to git
        </span>

        <canvas ref={canvasRef}></canvas>

        <div className="btns-container-2">
            <button className="more-btn">לעיצובים נוספים</button>
            <button className="share-btn" onClick={onToggleShareModal}>שתף</button>
        </div>
    </div>
}