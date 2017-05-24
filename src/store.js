import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {mailingReducer} from './reducers'
import {client} from './apollo'
import { reducer as formReducer } from 'redux-form'

export const store = createStore(
    combineReducers({
        mailing:mailingReducer,
        apollo:client.reducer(),
        form: formReducer,
    }),
    {},
      compose(
          applyMiddleware(client.middleware()),
          // If you are using the devToolsExtension, you can add it here also
          (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
    )