const initialState = {
    stories: null
}
export function storyReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_STORIES':
            newState = { ...state, stories: action.stories }
            break;
        default:
    }

    return newState;

}
