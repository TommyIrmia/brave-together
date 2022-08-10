import { storyActions } from '../../consts/store.consts'
const { SET_STORY, SET_STORIES, ADD_STORY, UPDATE_STORY, SET_IS_LOADING, REMOVE_STORY } = storyActions

const initialState = {
    story: null,
    stories: [],
    isLoading: false
}

export function storyReducer(state = initialState, action) {
    var stories

    switch (action.type) {
        case SET_STORY:
            return { ...state, story: action.story }
        case SET_STORIES:
            return { ...state, stories: action.stories }
        case ADD_STORY:
            return { ...state, stories: [...state.stories, action.story] }
        case UPDATE_STORY:
            stories = state.stories.map(story => story._id === action.story._id)
            return { ...state, stories }
        case REMOVE_STORY:
            stories = state.stories.filter(story => story._id !== action.storyId)
            return { ...state, stories }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        default:
            return state
    }

}
