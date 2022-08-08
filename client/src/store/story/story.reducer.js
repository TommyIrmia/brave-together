const initialState = {
    story: null,
    stories: []
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
        case 'UPDATE_STORY':
            newState = { ...state, stories: state.stories.map(story => story._id === action.story._id) }
            break;
        case 'REMOVE_STORY':
            newState = { ...state, stories: state.stories.filter(story => story._id !== action.storyId) }
            break;
        default:
    }

    return newState;

}
