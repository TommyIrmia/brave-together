import React, { useRef, useState } from 'react'

import { ToolBarOptions } from '../../cmps/quote/quote-edit/tool-bar-options'
import { DynamicOptions } from '../../cmps/quote/quote-edit/dynamic-options'
import { OptionsContainer } from '../../cmps/quote/quote-edit/options-container'
import { CanvasContainer } from '../../cmps/quote/quote-edit/canvas-container'
import { Share } from '../../cmps/share/share'

import { defaultToolbarOptions } from '../../consts/consts'
import { useDispatch, useSelector } from 'react-redux'
import { getUploadManager } from '../../services/aws.service'
import { updateQuoteToEdit, updateQuote, addQuote } from '../../store/quote/quote.action'

export const QuoteEdit = () => {
  const { quote } = useSelector((globalState) => globalState.quoteModule)

  const [isShareModalOpen, setIsShareModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultToolbarOptions[0])
  const dispatch = useDispatch()

  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  const onUpdateQuote = (quote) => {
    dispatch(updateQuoteToEdit(quote))
  }

  const onSaveQuote = async () => {
    const imgUrl = await uploadImg()
    quote.imgUrl = imgUrl
    if (quote._id) await dispatch(updateQuote(quote))
    else await dispatch(addQuote(quote))
    onToggleShareModal()
  }

  const uploadImg = async () => {
    const image = canvasRef.current.toDataURL('image/png')
    const uploadMngr = await getUploadManager('images', image)
    return new Promise((resolve, reject) => {
      uploadMngr.send((err, data) => {
        err ? resolve('') : resolve(data.Location)
      })
    })
  }

  const onToggleShareModal = () => {
    setIsShareModal(!isShareModalOpen)
  }

  return (
    <section className="quote-edit-container">
      <Share canvas={canvasRef.current} isOpen={isShareModalOpen} onClose={onToggleShareModal} />

      <CanvasContainer canvasRef={canvasRef} ctxRef={ctxRef} onUpdateQuote={onUpdateQuote} onSaveQuote={onSaveQuote} />

      <section className="tool-bar-container">
        <OptionsContainer options={selectedOption.subTypes} setOption={setSelectedOption}>
          <DynamicOptions selectedOption={selectedOption} options={selectedOption.subTypes || null} quote={quote} onUpdateQuote={onUpdateQuote} />
        </OptionsContainer>

        <ToolBarOptions setOption={setSelectedOption} chosenOption={selectedOption} />
      </section>
    </section>
  )
}
