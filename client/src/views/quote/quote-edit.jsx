import React, { useRef, useState } from 'react'

import { ToolBarOptions } from '../../cmps/quote/quote-edit/tool-bar-options'
import { DynamicOptions } from '../../cmps/quote/quote-edit/dynamic-options'
import { OptionsContainer } from '../../cmps/quote/quote-edit/options-container'
import { CanvasContainer } from '../../cmps/quote/quote-edit/canvas-container'
import { Share } from '../../cmps/share/share'

import { defaultToolbarOptions } from '../../consts/consts'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuoteToEdit } from '../../store/quote/quote.action'


export const QuoteEdit = () => {

    const { quote } = useSelector(globalState => globalState.quoteModule)

    const [isShareModalOpen, setIsShareModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState(defaultToolbarOptions[0])

    const dispatch = useDispatch()

    const canvasRef = useRef(null)
    const ctxRef = useRef(null)

    const onUpdateQuote = (quote) => {
        dispatch(updateQuoteToEdit(quote))
    }

    const onToggleShareModal = () => {
        setIsShareModal(!isShareModalOpen)
    }

    return (
        <section className="quote-edit-container">

            <Share
                canvas={canvasRef.current}
                isOpen={isShareModalOpen}
                onClose={onToggleShareModal}
            />

            <CanvasContainer
                canvasRef={canvasRef}
                ctxRef={ctxRef}
                onUpdateQuote={onUpdateQuote}
                onToggleShareModal={onToggleShareModal}
            />

            <section className="tool-bar-container">
                <OptionsContainer options={selectedOption.subTypes} setOption={setSelectedOption}>
                    <DynamicOptions
                        selectedOption={selectedOption}
                        options={selectedOption.subTypes || null}
                        quote={quote}
                        onUpdateQuote={onUpdateQuote}
                    />
                </OptionsContainer>

                <ToolBarOptions setOption={setSelectedOption} chosenOption={selectedOption} />
            </section>
        </section>
    )
}
