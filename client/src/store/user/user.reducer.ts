

const initialState = {
    user: null
}
export function userReducer(state = initialState, action : any) {
    var newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        default:
    }

    return newState;

}
