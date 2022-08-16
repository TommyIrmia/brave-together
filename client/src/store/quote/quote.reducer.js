const initialState = {
    quote: null,
    quotes: [],
    filterBy: {
        text: '',
        page: 1
    }
}
export function quoteReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_QUOTE':
            newState = { ...state, quote: action.quote }
            break;
        case 'SET_QUOTES':
            newState = { ...state, quotes: action.quotes }
            break;
        case 'SET_QUOTES_PAGE':
            newState = { ...state, filterBy: { ...state.filterBy, page: action.page } }
            break;
        case 'ADD_QUOTE':
            newState = { ...state, quotes: [...state.quotes, action.quote] }
            break;
        case 'UPDATE_QUOTE':
            newState = { ...state, quotes: state.quotes.map(quote => quote._id === action.quote.id ? action.quote : quote) }
            break;
        case 'REMOVE_QUOTE':
            newState = { ...state, quotes: state.quotes.filter(quote => quote._id !== action.quoteId) }
            break;
        default:
    }
    return newState;

}
