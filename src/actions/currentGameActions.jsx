import axios from 'axios'
import * as actions from '../constants/actionTypes'
import { RANKED_SOLO_5x5 } from '../constants/riotConstants'

const receivedRealmVersion = (payload) => {
  return {
    type: actions.RECEIVED_REALM_VERSION,
    payload
  }
}

const receivedChampionImages = (payload) => {
  return {
    type: actions.RECEIVED_CHAMPION_IMAGES,
    payload
  }
}

const receivedRankedLeague = (payload, summonerId) => {
  return {
    type: actions.RECEIVED_RANKED_LEAGUE,
    payload,
    summonerId
  }
}

export const getRealmVersion = (serviceRegion) => {
  return (dispatch) => {
    return axios.get(`/api/realmVersion?serviceRegion=${serviceRegion}`)
      .then(response => {
        dispatch(receivedRealmVersion(response.data.dd))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export const getChampionImages = (serviceRegion) => {
  return (dispatch) => {
    return axios.get(`/api/championImages?serviceRegion=${serviceRegion}`)
      .then(response => {
        dispatch(receivedChampionImages(response.data.data))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export const getRankedLeague = (serviceRegion, summonerId) => {
  return (dispatch) => {
    return axios.get(`/api/rankedLeague?serviceRegion=${serviceRegion}&summonerId=${summonerId}`)
      .then(response => {
        dispatch(receivedRankedLeague(response.data, summonerId))
        return response
      }).catch(err => {
        return err.response
      })
  }
}