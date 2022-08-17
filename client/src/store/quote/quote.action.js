import { quoteService } from '../../services/api/quote.service'
import { quoteActions } from '../../consts/store.consts'
const { SET_QUOTES, SET_QUOTES_PAGE } = quoteActions

export function selectQuote(quoteId) {
    return async (dispatch) => {
        const quote = await quoteService.getById(quoteId)
        // const quote = await storageService.get('quote',quoteId)
        dispatch({
            type: 'SET_QUOTE',
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

export function setFilterPage(page) {
    return async (dispatch) => {
        dispatch({
            type: SET_QUOTES_PAGE,
            page
        })
    }
}