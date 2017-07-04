import axios from 'axios'
import * as actions from '../constants/actionTypes'

const receivedRealmVersion = (payload) => {
  return {
    type: actions.RECEIVED_REALM_VERSION,
    payload
  }
}

const receivedChampionImages = (payload, championIds) => {
  return {
    type: actions.RECEIVED_CHAMPION_IMAGES,
    payload,
    championIds
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

export const getChampionImages = (serviceRegion, championIds) => {
  return (dispatch) => {
    return axios.get(`/api/championImages?serviceRegion=${serviceRegion}`)
      .then(response => {
        dispatch(receivedChampionImages(response.data.data, championIds))
        return response
      }).catch(err => {
        return err.response
      })
  }
}