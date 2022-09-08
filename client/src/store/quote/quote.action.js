import { quoteService } from '../../services/api/quote.service'

import { storageService } from '../../services/storage.service'

import { quoteActions } from '../../consts/store.consts'
const { SET_QUOTE, SET_QUOTES, SET_QUOTES_PAGE, TOGGLE_SHARING, UPDATE_QUOTE, ADD_QUOTE } = quoteActions


export function selectQuoteToEdit({ quoteId, txt }) {
    return async (dispatch) => {
        try {
            const quote = quoteId ? await quoteService.getById(quoteId) : quoteService.getEmptyQuote(txt)
            storageService.saveQuoteToStorage(quote)
            dispatch({
                type: SET_QUOTE,
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
            type: SET_QUOTE,
            quote
        })
    }
}

export function getQuotes(filter) {
    return async (dispatch) => {
        try {
            const quotesInfo = await quoteService.getQuotes(filter)
            dispatch({
                type: SET_QUOTES,
                quotesInfo
            })
        } catch (err) {
            console.log('Error loading quotes from db', err);
        }
    }
}

export function toggleSharing() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_SHARING,
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
        dispatch({
            type: ADD_QUOTE,
            quote: quoteToAdd
        })
    }
}

export function updateQuote(quote) {
    return async (dispatch) => {
        const updatedQuote = await quoteService.update(quote)
        dispatch({
            type: UPDATE_QUOTE,
            quote: updatedQuote
        })
    }
}

export function setFilterPage(page) {
    return async (dispatch) => {
        dispatch({
            type: SET_QUOTES_PAGE,
            page
        })
    }
}