import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import reducers from './reducers'

/**
 * create store and apply middlewares
 * @type {Store<any>}
 */
const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxPromise)
)

export default store
