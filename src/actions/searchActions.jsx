import axios from 'axios'
import * as actions from '../constants/actionTypes'

const fetchingCurrentGame = () => {
  return {
    type: actions.FETCHING_CURRENT_GAME
  }
}

const receivedCurrentGame = (payload) => {
  return {
    type: actions.RECEIVED_CURRENT_GAME,
    payload
  }
}

const errorFetchingExampleSummoner = (error) => {
  return {
    type: actions.ERROR_FETCHING_EXAMPLE_SUMMONER,
    error
  }
}

const fetchingExampleSummoner = () => {
  return {
    type: actions.FETCHING_EXAMPLE_SUMMONER
  }
}

const receivedExampleSummoner = (payload) => {
  return {
    type: actions.RECEIVED_EXAMPLE_SUMMONER,
    payload
  }
}

const errorFetchingCurrentGame = (error) => {
  return {
    type: actions.ERROR_FETCHING_CURRENT_GAME,
    error
  }
}

const fetchingSearchHistory = () => {
  return {
    type: actions.FETCHING_SEARCH_HISTORY
  }
}

const receivedSearchHistory = (payload) => {
  return {
    type: actions.RECEIVED_SEARCH_HISTORY,
    payload
  }
}

const errorFetchingSearchHistory = (error) => {
  return {
    type: actions.ERROR_FETCHING_SEARCH_HISTORY,
    error
  }
}

export const getSearchHistory = () => {
  return (dispatch) => {
    dispatch(fetchingSearchHistory())
    return axios.get('/api/searchHistory')
      .then(response => {
        dispatch(receivedSearchHistory(response.data))
        return response
      }).catch(err => {
        dispatch(errorFetchingSearchHistory(err.response))
        return err.response
      })
  }
}

export const getCurrentGame = (serviceRegion, summonerName) => {
  return (dispatch) => {
    dispatch(fetchingCurrentGame())
    return axios.get(`/api/summonerByName?serviceRegion=${serviceRegion}&summonerName=${summonerName}`)
      .then(response => {
        return axios.get(`/api/currentGame?serviceRegion=${serviceRegion}&summonerId=${response.data.id}`)
          .then(response => {
            dispatch(receivedCurrentGame(response.data))
            return response
          }).catch(err => {
            if (err.response.data.error === "GAME_NOT_FOUND") {
              dispatch(errorFetchingCurrentGame(err.response))
              return err.response
            }
          })
      })
      .catch(err => {
        if (err.response.data.error === "PLAYER_NOT_FOUND") {
          dispatch(errorFetchingCurrentGame(err.response))
          return err.response
        }
      })
  }
}

export const findExampleSummoner = () => {
  return (dispatch) => {
    dispatch(fetchingExampleSummoner())
    return axios.get(`/api/findExampleSummoner`)
      .then(response => {
        dispatch(receivedExampleSummoner(response.data))
      }).catch(err => {
        dispatch(errorFetchingExampleSummoner(err.response))
        return err.response
      })
  }
}