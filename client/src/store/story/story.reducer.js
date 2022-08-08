const initialState = {
    story: null,
    stories: []
}

export function storyReducer(state = initialState, action) {
    var stories

    switch (action.type) {
        case 'SET_STORY':
            return { ...state, story: action.story }
        case 'SET_STORIES':
            return { ...state, stories: action.stories }
        case 'ADD_STORY':
            return { ...state, stories: [...state.stories, action.story] }
        case 'UPDATE_STORY':
            stories = state.stories.map(story => story._id === action.story._id)
            return { ...state, stories }
        case 'REMOVE_STORY':
            stories = state.stories.filter(story => story._id !== action.storyId)
            return { ...state, stories }
        default:
            return state
    }

}
