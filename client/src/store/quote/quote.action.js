import { storageService } from '../../services/async-local-storage.service'


export function remove(quoteId) {
    return async (dispatch) => {
        await storageService.remove(quoteId)
        dispatch({
            type: 'REMOVE_QUOTE',
            quoteId
        })
    }
}