import { storageService } from './storage.service'
export const canvasService = {
    getTemplate,
    drawText,
    drawBgcColor,
    drawBgcImg,
    getEvPos,
    isElClicked,
    setElPos,
    getTxtPos,
    addMouseListeners,
    addTouchListeners,
    removeMouseListeners,
    removeTouchListeners,
    drawImgs,
    getImg,
    drawFrame
}

// GLOBALS

const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let gLines = storageService.getLinesFromStorage()
let gImgs = []
const QUOTE = "\""

//GETTERS

function getTemplate(txt) {
    let template = storageService.getTempFromStorage();
    if (!template || template?.txt?.content !== txt) template = getEmptyTemplate(txt)
    storageService.saveTempToStorage(template)
    return template
}

function getEmptyTemplate(content) {
    return {
        background: { type: 'color', attr: '#ffffff' },//'images/111-02.svg',
        imgs: [],
        frame: '',
        txt: {
            content,
            fontSize: 16,
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontColor: '#000000',
            pos: { x: 50, y: 150 }
        }
    }
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY + 70
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function getTxtPos() {
    return {
        x: gLines[0].x,
        y: gLines[0].y
    }
}

function getImg(src) {
    const img = gImgs.find((i) => i.src === src)
    if (img) return img
    return {
        src,
        pos: { x: 100, y: 100 },
        size: 100
    }
}

function isElClicked(clickedPos) {
    let elClicked = null;
    if (gLines.length) {
        const line = _getLineClicked(gLines, clickedPos)
        if (line) elClicked = { type: 'txt', ...line }
    }

    if (gImgs.length) {
        const img = _getImgClicked(gImgs, clickedPos)
        if (img) elClicked = { type: 'img', ...img }
    }

    return elClicked
}

function _getLineClicked(lines, clickedPos) {
    return lines.find((line) => {
        const lineArea = {
            x: line.x - line.width,
            y: line.y + line.size
        };
        return (clickedPos.x <= line.x + 10 && clickedPos.x >= lineArea.x - 10 &&
            clickedPos.y - 50 >= line.y && clickedPos.y - 50 <= lineArea.y + 5);
    })
}

function _getImgClicked(imgs, clickedPos) {
    const imgsCopy = imgs.slice().reverse()
    return imgsCopy.find((img) => {
        const { pos, size } = img
        const lineArea = {
            x: pos.x + size,
            y: pos.y + size + 50
        };
        return (clickedPos.x >= pos.x - 10 && clickedPos.x <= lineArea.x + 10
            && clickedPos.y >= pos.y && clickedPos.y <= lineArea.y + 5);
    })
}

// DRAW FUNCS

function drawText(canvas, ctx, isRecomputeTxtWidth, { content, fontSize, fontFamily, fontColor, pos }) {
    ctx.lineWidth = 2;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.strokeStyle = fontColor;
    ctx.fillStyle = fontColor;
    if (!gLines.length || isRecomputeTxtWidth) {
        _drawContentAndGetWidth(content, pos, ctx, canvas)
    } else {
        _reDrawContent(ctx)
    }
}

function _drawContentAndGetWidth(txt, { x, y }, ctx, canvas, lineHeight = 25) {
    const words = txt.split(' ')
    const maxWidth = canvas.width - 100
    gLines = []

    let line = '';
    words.forEach((word, idx) => {
        if (!idx && word.charAt(0) !== QUOTE) line += QUOTE
        const testLine = line + word + ' ';
        const { width } = ctx.measureText(testLine)
        if (width > maxWidth && idx > 0) {
            _drawLine(line, ctx, canvas, y, lineHeight)
            line = word + ' ';
            y += +lineHeight;
        } else line = testLine;
    })
    if (line.charAt(line.length - 1) !== QUOTE) line += QUOTE
    _drawLine(line, ctx, canvas, y, lineHeight)
    storageService.saveLinesToStorage(gLines)
}

function _drawLine(line, ctx, canvas, posY, lineHeight) {
    const posX = _getPosCenter(line, ctx, canvas)
    gLines.push({ x: posX, y: posY, width: ctx.measureText(line).width, size: lineHeight, txt: line })
    ctx.fillText(line, posX, posY);
}

function _reDrawContent(ctx) {
    gLines.forEach(line => {
        ctx.fillText(line.txt, line.x, line.y);
    })
    storageService.saveLinesToStorage(gLines)
}

function drawBgcColor(canvas, ctx, color) {
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.stroke()
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

async function drawBgcImg(canvas, ctx, src) {
    return new Promise(res => {
        const imgToDraw = new Image()
        imgToDraw.src = src
        // imgToDraw.onload = () => {
        ctx.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height)
        res()
        // }
    })
}

async function drawImgs(ctx, imgs) {
    return new Promise(res => {
        imgs.forEach((img, idx) => {
            const { src, pos, size } = img
            const imgToDraw = new Image()
            imgToDraw.src = src
            // imgToDraw.onload = () => {
            ctx.drawImage(imgToDraw, pos.x, pos.y, size, size)
            if (idx === imgs.length - 1) res()
            // }
        })
        gImgs = imgs
    })
}

async function drawFrame(canvas, ctx, src) {
    console.log(src);
    return new Promise(res => {
        const imgToDraw = new Image()
        imgToDraw.src = src
        ctx.drawImage(imgToDraw, -5, 0, canvas.width + 5, canvas.height)
        res()
        // }
    })
}

//SETTERS

function setElPos(ev, el, startPos) {
    const pos = getEvPos(ev);
    const dx = pos.x - startPos.x
    const dy = pos.y - startPos.y

    if (el.type === 'txt') {
        gLines = gLines.map(line => {
            const newLine = { ...line, x: line.x += dx, y: line.y += dy }
            return newLine
        })
    }
    if (el.type === 'img') {
        const newImg = { ...el, pos: { x: el.pos.x += dx, y: el.pos.y += dy } }
        gImgs = gImgs.map(img => newImg.src === img.src ? newImg : img)
    }
    return pos
}


// LISTENERS

function addMouseListeners(canvas, { onDown, onMove, onUp }) {
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseup', onUp)
}

function addTouchListeners(canvas, { onDown, onMove, onUp }) {
    canvas.addEventListener('touchstart', onDown)
    canvas.addEventListener('touchmove', onMove)
    canvas.addEventListener('touchend', onUp)
}

function removeMouseListeners(canvas, { onDown, onMove, onUp }) {
    canvas.removeEventListener('mousedown', onDown)
    canvas.removeEventListener('mousemove', onMove)
    canvas.removeEventListener('mouseup', onUp)
}

function removeTouchListeners(canvas, { onDown, onMove, onUp }) {
    canvas.removeEventListener('touchstart', onDown)
    canvas.removeEventListener('touchmove', onMove)
    canvas.removeEventListener('touchend', onUp)
}

// PRIVATE

function _getPosCenter(line, ctx, canvas) {
    const lineWidth = ctx.measureText(line).width
    const diff = canvas.width - lineWidth

    return (canvas.width - (diff / 2))
}


