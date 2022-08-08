import { storageService } from '../../services/async-local-storage.service'
import {storyService} from '../../services/api/story.service'

export function remove(storyId) {
    return async (dispatch) => {
        await storageService.remove(storyId)
        dispatch({
            type: 'REMOVE_STORY',
            storyId
        })
    }
}

export function getStory(storyId) {
    return async (dispatch) => {
        const story = await storyService.getById(storyId)
        console.log('story', story);
        dispatch({
            type: 'SET_STORY',
            storyId
        })
    }
}