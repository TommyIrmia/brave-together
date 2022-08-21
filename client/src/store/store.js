// const { createStore, applyMiddleware, combineReducers, compose } = Redux
// const thunk = ReduxThunk.default

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { userReducer } from './user/user.reducer.js'
import { storyReducer } from './story/story.reducer.js'
import { quoteReducer } from './quote/quote.reducer.js'
// import { collectionReducer } from './collection/collection.reducer.js'

const rootReducer = combineReducers({
    userModule: userReducer,
    storyModule: storyReducer,
    quoteModule: quoteReducer,
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// export const store = createStore(rootReducer, applyMiddleware(thunk))


