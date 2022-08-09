import { storyService } from '../../services/api/story.service'
import { storageService } from '../../services/async-local-storage.service'

export function query(filterBy) {
    return async (dispatch) => {
        const stories = await storyService.getStories(filterBy)
        // const stories = await storageService.query('story')
        // console.log('stories', stories)
        dispatch({
            type: 'SET_STORIES',
            stories: stories
        })
    }
}

export function setFilterByTxt(txt) {
    return async (dispatch) => {
        dispatch({
            type: 'SET_FILTERBYTXT',
            txt: txt
        })
    }
}
export function setFilterByTags(selectedTags) {
    return async (dispatch) => {
        dispatch({
            type: 'SET_FILTERBYTAGS',
            tags: selectedTags
        })
    }
}

export function selectStory(storyId) {
    return async (dispatch) => {
        const story = await storyService.getById(storyId)
        // const story = await storageService.get('story',storyId)

        // console.log('story', story)
        dispatch({
            type: 'SET_STORY',
            story: story
        })
    }
}

export function addStory(storyToAdd) {
    return async (dispatch) => {
        const story = await storyService.add(storyToAdd)
        // const story = await storageService.post('story',storyToAdd)
        // console.log('story', story)
        dispatch({
            type: 'ADD_STORY',
            story
        })
    }
}

export function removeStory(storyId) {
    return async (dispatch) => {
        await storyService.remove(storyId)
        // await storageService.post('story',storyId)
        dispatch({
            type: 'REMOVE_STORY',
            storyId
        })
    }
}

export function updateStory(storyToUpdate) {
    return async (dispatch) => {
        const story = await storyService.update(storyToUpdate)
        // const story = await storageService.post('story',storyToUpdate)
        dispatch({
            type: 'UPDATE_STORY',
            story
        })
    }
}