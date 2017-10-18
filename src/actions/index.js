import axios from 'axios'
import { GET_CURRENCIES, GET_LOGS } from './types'
import { AsyncStorage } from 'react-native'

export const getRemoteCurrencies = () => {
  /**
   * As we use react-promise middleware
   * we can pass a promise to dispatcher
   */
  let data = axios.get(`https://txf-ecb.glitch.me/rates`)

  return {
    type: GET_CURRENCIES,
    payload: data
  }
}

/**
 * pass selectedBase to reducer
 * @param data
 * @returns {{type, payload: (any|Array.<any>|*)}}
 */
export const logProcess = (data) => {
  let timeStamp = new Date()
  let log = {}
  log[timeStamp] = data

  // todo remove old logs to prevent performance issues

  // merge
  AsyncStorage.mergeItem('logs', JSON.stringify(log)).then(() => {
    // success
  })

  return getLogs()
}

/**
 * push logs in application state
 * @returns {{type, payload: (any|Array.<any>|*)}}
 */
export const getLogs = () => {
  // get all entries
  let logs = AsyncStorage.getItem('logs')

  return {
    type: GET_LOGS,
    payload: logs
  }
}
