import { storageService } from '../../services/async-local-storage.service'


export function remove(collectionId) {
    return async (dispatch) => {
        await storageService.remove(collectionId)
        dispatch({
            type: 'REMOVE_COLLECTION',
            collectionId
        })
    }
}