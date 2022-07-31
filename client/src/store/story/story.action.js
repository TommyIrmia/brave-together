import { storageService } from '../../services/async-local-storage.service'


export function remove(storyId) {
    return async (dispatch) => {
        await storageService.remove(storyId)
        dispatch({
            type: 'REMOVE_STORY',
            storyId
        })
    }
}