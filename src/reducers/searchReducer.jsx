import * as actions from '../constants/actionTypes'

const initialState = {
  error: {},
  isFetching: false
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCHING_CURRENT_GAME:
      return {
        ...state,
        isFetching: true
      }
    case actions.RECEIVED_CURRENT_GAME:
      return {
        ...state,
        isFetching: false
      }
    case actions.ERROR_FETCHING_CURRENT_GAME:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      }
    default:
      return state
  }
}

export default searchReducer