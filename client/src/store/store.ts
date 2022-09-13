// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
//   }

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'


import { userReducer } from './user/user.reducer'
import { storyReducer } from './story/story.reducer'
import { quoteReducer } from './quote/quote.reducer'
import { collectionReducer } from './collection/collection.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    storyModule: storyReducer,
    quoteModule: quoteReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// export const store = createStore(rootReducer, applyMiddleware(thunk))


