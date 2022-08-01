const initialState = {
    quote: null,
    quotes: []
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
        case 'ADD_QUOTE':
            newState = { ...state, quotes: [...state.quotes, action.quote] }
            break;
        // case 'UPDATE_QUOTE':
        //     newState = { ...state, quotes: action.quotes }
        //     break;
        // case 'REMOVE_QUOTE':
        //     newState = { ...state, quotes: action.quotes }
        //     break;
        default:
    }

    return newState;

}
