const initialState = {
    story: null,
    stories: [],
    filterBy: { txt: null, tags: [] },
}
export function storyReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_STORY':
            newState = { ...state, story: action.story }
            break;
        case 'SET_STORIES':
            newState = { ...state, stories: action.stories }
            break;
        case 'ADD_STORY':
            newState = { ...state, stories: [...state.stories, action.story] }
            break;
        case 'SET_FILTERBYTXT':
            newState = { ...state, filterBy: { ...state.filterBy, txt: action.txt } }
            break;
        case 'SET_FILTERBYTAGS':
            newState = { ...state, filterBy: { ...state.filterBy, tags: action.tags } }
            break;
        // case 'UPDATE_STORY':
        // newState = { ...state, stories: }
        //     break;
        // case 'REMOVE_STORY':
        // newState = { ...state, stories: }
        //     break;
        default:
    }

    return newState;

}
