import { combineReducers } from 'redux'
import currencies from './currency-reducer'
import logs from './log-reducer'

export default combineReducers({
  currencies,
  logs
})
