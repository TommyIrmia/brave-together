const initialState = {
    selectedQuote: null,
    quotes: []
}
export function quoteReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_QUOTE':
            newState = { ...state, selectedQuote: action.quote }
            break;
        case 'SET_QUOTES':
            newState = { ...state, quotes: action.quotes }
            break;
        default:
    }

    return newState;

}
