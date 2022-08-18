import { storyService } from '../../services/api/story.service'
import { storyActions } from '../../consts/store.consts'
const { SET_STORY, SET_STORIES, ADD_STORY, UPDATE_STORY, SET_IS_LOADING, REMOVE_STORY, SET_FILTERBY } = storyActions

function getActionLoading(isLoading) {
    return {
        type: SET_IS_LOADING,
        isLoading
    }
}


export function query(filterBy) {
    return async (dispatch) => {
        const stories = await storyService.getStories(filterBy)
        dispatch({
            type: SET_STORIES,
            stories: stories
        })
    }
}


export function setFilterBy(key, value) {
    return async (dispatch, getState) => {
        let { filterBy } = getState().storyModule
        const filterToUpdate = { ...filterBy, [key]: value }
        dispatch({
            type: SET_FILTERBY,
            filterBy: filterToUpdate
        })
    }
}



export function loadStoryById(storyId) {
    return async (dispatch) => {
        try {
            dispatch(getActionLoading(true))
            const story = await storyService.getById(storyId)
            dispatch({
                type: SET_STORY,
                story
            })
            dispatch(getActionLoading(false))
        } catch (err) {
            console.log('err from load story by id', err);
        }
    }
}


export function addStory(storyToAdd) {
    return async (dispatch) => {
        const story = await storyService.add(storyToAdd)
        // const story = await storageService.post('story',storyToAdd)
        dispatch({
            type: ADD_STORY,
            story
        })
    }
}

export function removeStory(storyId) {
    return async (dispatch) => {
        await storyService.remove(storyId)
        // await storageService.post(story,storyId)
        dispatch({
            type: REMOVE_STORY,
            storyId
        })
    }
}

export function updateStory(storyToUpdate) {
    return async (dispatch) => {
        const story = await storyService.update(storyToUpdate)
        // const story = await storageService.post('story',storyToUpdate)
        dispatch({
            type: UPDATE_STORY,
            story
        })
    }
}

