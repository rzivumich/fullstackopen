import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdotereducer, {initializeAnecdote}  from './reducers/anecdoteReducer'
import notificationreducer from './reducers/notificationReducer'
import filterreducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdote: anecdotereducer,
    notification: notificationreducer,
    filter: filterreducer
  })
  
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store