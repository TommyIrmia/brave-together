import { userService } from '../../services/api/user.service'


export function login(credentials) {
    return async (dispatch) => {
        const user = await userService.login(credentials)
        try {
            dispatch({
                type: 'SET_USER',
                user: user
            })
        } catch (err) {
            throw err;
        }

    }
}

export function logout() {
    return async (dispatch) => {
        await userService.logout()
        dispatch({
            type: 'SET_USER',
            user: null
        })

    }
}

export function signup(credentials) {
    return async (dispatch) => {
        const user = await userService.signup(credentials)
        try {
            dispatch({
                type: 'SET_USER',
                user: user
            })
        } catch (err) {
            throw err;
        }
    }
}