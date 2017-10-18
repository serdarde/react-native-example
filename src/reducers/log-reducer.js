import { GET_LOGS } from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_LOGS:
      return {...state, ...JSON.parse(action.payload)}
    default:
      return {...state}
  }
}
