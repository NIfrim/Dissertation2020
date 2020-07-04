import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initState = {}

const middleware = [thunk]

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 })

const store = createStore(
  rootReducer,
  initState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
