import {combineReducers, applyMiddleware, createStore} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

const appReducer = combineReducers(reducers)
const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') 
    middlewares.push(logger)

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export default store