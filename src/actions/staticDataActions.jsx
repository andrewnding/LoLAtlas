import axios from 'axios'
import * as actions from '../constants/actionTypes'

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

const receivedChampionData = (payload) => {
  return {
    type: actions.RECEIVED_CHAMPION_DATA,
    payload
  }
}

const receivedSummonerSpells = (payload) => {
  return {
    type: actions.RECEIVED_SUMMONER_SPELLS,
    payload
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

export const getChampionData = (serviceRegion) => {
  return (dispatch) => {
    return axios.get(`/api/championData?serviceRegion=${serviceRegion}`)
      .then(response => {
        dispatch(receivedChampionData(response.data.data))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export const getSummonerSpells = (serviceRegion) => {
  return (dispatch) => {
    return axios.get(`/api/summonerSpells?serviceRegion=${serviceRegion}`)
      .then(response => {
        dispatch(receivedSummonerSpells(response.data.data))
        return response
      }).catch(err => {
        return err.response
      })
  }
}