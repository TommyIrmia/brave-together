import { quoteService } from '../../services/api/quote.service'
import { storageService } from '../../services/storage.service'

export function selectQuoteToEdit({ quoteId, txt }) {
    return async (dispatch) => {
        try {
            const quote = quoteId ? await quoteService.getById(quoteId) : quoteService.getEmptyQuote(txt)
            console.log('quote', quote)
            storageService.saveQuoteToStorage(quote)
            dispatch({
                type: 'SET_QUOTE',
                quote
            })
        } catch (err) {
            console.log('err from select quote', err)
        }
    }
}

export function updateQuoteToEdit(quote) {
    return (dispatch) => {
        storageService.saveQuoteToStorage(quote)
        dispatch({
            type: 'SET_QUOTE',
            quote
        })
    }
}

export function getQuotes() {
    return async (dispatch) => {
        const quotes = await quoteService.getQuotes()
        // const quotes = await geService.get('quote')
        dispatch({
            type: 'SET_QUOTES',
            quotes
        })
    }
}

export function remove(quoteId) {
    return async (dispatch) => {
        await quoteService.remove(quoteId)
        // await storageService.remove('quote',quoteId)
        dispatch({
            type: 'REMOVE_QUOTE',
            quoteId
        })
    }
}

export function addQuote(quote) {
    return async (dispatch) => {
        const quoteToAdd = await quoteService.add(quote)
        // const quoteToAdd = await storageService.post('quote',quote)
        dispatch({
            type: 'ADD_QUOTE',
            quote: quoteToAdd
        })
    }
}

export function updateQuote(quote) {
    return async (dispatch) => {
        const updatedQuote = await quoteService.update(quote)
        // const updatedQuote = await storageService.put('quote',quote)
        dispatch({
            type: 'UPDATE_QUOTE',
            quote: updatedQuote
        })
    }
}