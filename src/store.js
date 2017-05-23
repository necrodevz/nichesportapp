import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {mailingReducer} from './reducers'
import {client} from './apollo'

export const store = createStore(
    combineReducers({
        mailing:mailingReducer,
        apollo:client.reducer()
    }),
    {},
      compose(
          applyMiddleware(client.middleware()),
          // If you are using the devToolsExtension, you can add it here also
          (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
    )