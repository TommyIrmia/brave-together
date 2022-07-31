const initialState = {
    collection: null,
}
export function collectionReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_COLLECTION':
            newState = { ...state, collection: action.collection }
            break;

        default:
    }
    return newState;
}
