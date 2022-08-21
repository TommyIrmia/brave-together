import { storageService } from "../../services/storage.service"

console.log('storageService.getQuoteFromStorage()', storageService.getQuoteFromStorage())

const initialState = {
    quote: storageService.getQuoteFromStorage() || null,
    quotes: [],
    totalQuotesCount: null,
    isSharing: false,
    filterBy: {
        text: '',
        page: 1,
        quotesPerPage: 3
    }

}
export function quoteReducer(state = initialState, action) {
    var quotes
    switch (action.type) {
        case 'SET_QUOTE':
            return { ...state, quote: action.quote }
        case 'SET_QUOTES':
            return { ...state, quotes: action.quotes }
        case 'SET_QUOTES_PAGE':
            return { ...state, filterBy: { ...state.filterBy, page: action.page } }
        case 'TOGGLE_SHARING':
            return { ...state, isSharing: !state.isSharing }
        case 'ADD_QUOTE':
            return { ...state, quotes: [...state.quotes, action.quote] }
        case 'UPDATE_QUOTE':
            quotes = state.quotes.map(quote => quote._id === action.quote.id ? action.quote : quote)
            return { ...state, quotes }
        case 'REMOVE_QUOTE':
            quotes = state.quotes.filter(quote => quote._id !== action.quoteId)
            return { ...state, quotes }
        default:
            return state
    }
}
