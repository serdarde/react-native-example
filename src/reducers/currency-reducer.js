import { GET_CURRENCIES } from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CURRENCIES:
      return {...state, ...action.payload.data}
    default:
      return {...state}
  }
}
