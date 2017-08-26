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

const errorFetchingCurrentGame = (error) => {
  return {
    type: actions.ERROR_FETCHING_CURRENT_GAME,
    error
  }
}

export const getCurrentGame = (serviceRegion, summonerName) => {
  return (dispatch) => {
    dispatch(fetchingCurrentGame())
    return axios.get(`/api/summonerById?serviceRegion=${serviceRegion}&summonerName=${summonerName}`)
      .then(response => {
        return axios.get(`/api/currentGame?serviceRegion=${serviceRegion}&summonerId=${response.data.id}`)
          .then(response => {
            dispatch(receivedCurrentGame(response.data))
            return response
          }).catch(err => {
            if (err.response.data.error === "GAME_NOT_FOUND") {
              dispatch(errorFetchingCurrentGame(err.response))
              return err.response
              // Do data not found stuff here
            }
          })
      })
      .catch(err => {
        if (err.response.data.error === "PLAYER_NOT_FOUND") {
          dispatch(errorFetchingCurrentGame(err.response))
          return err.response
          // Do player not found stuff here
        }
      })
  }
}