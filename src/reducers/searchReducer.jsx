import * as actions from '../constants/actionTypes'

const initialState = {
  error: {},
  isFetching: false,
  isFetchingSearchHistory: false,
  summonerName: '',
  serviceRegion: 'NA'
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
    case actions.FETCHING_SEARCH_HISTORY:
      return {
        ...state,
        isFetchingSearchHistory: true
      }
    case actions.RECEIVED_SEARCH_HISTORY:
      return {
        ...state,
        isFetchingSearchHistory: false,
        summonerName: action.payload.summonerName,
        serviceRegion: action.payload.serviceRegion
      }
    case actions.ERROR_FETCHING_SEARCH_HISTORY:
      return {
        ...state,
        error: action.payload,
        isFetchingSearchHistory: false
      }
    default:
      return state
  }
}

export default searchReducer