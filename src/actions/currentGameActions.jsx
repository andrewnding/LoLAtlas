import axios from 'axios'
import * as actions from '../constants/actionTypes'
import { RANKED_SOLO_5x5 } from '../constants/riotConstants'

const receivedRankedLeague = (payload, summonerId) => {
  return {
    type: actions.RECEIVED_RANKED_LEAGUE,
    payload,
    summonerId
  }
}

const receivedAccountId = (payload, summonerId) => {
  return {
    type: actions.RECEIVED_ACCOUNT_ID,
    payload,
    summonerId
  }
}

const receivedRecentRankedMatches = (payload, accountId) => {
  return {
    type: actions.RECEIVED_RECENT_RANKED_MATCHES,
    payload,
    accountId
  }
}

const receivedRecentRankedMatchesDetails = (payload, summonerId, gameId) => {
  return {
    type: actions.RECEIVED_RECENT_RANKED_MATCHES_DETAILS,
    payload,
    summonerId,
    gameId
  }
}

const receivedChampionMastery = (payload, summonerId) => {
  return {
    type: actions.RECEIVED_CHAMPION_MASTERY,
    payload,
    summonerId
  }
}


export const getRankedLeague = (serviceRegion, summonerId) => {
  console.log('GETTING RANKED LEAGUE')
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

export const getAccountId = (serviceRegion, summonerId) => {
  console.log('GETTING ACCOUNT ID')
  return (dispatch) => {
    return axios.get(`/api/accountId?serviceRegion=${serviceRegion}&summonerId=${summonerId}`)
      .then(response => {
        dispatch(receivedAccountId(response.data, summonerId))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export const getRecentRankedMatches = (serviceRegion, accountId) => {
  console.log('GETTING RANKED MATCHES')
  return (dispatch) => {
    return axios.get(`/api/recentRankedMatches?serviceRegion=${serviceRegion}&accountId=${accountId}`)
      .then(response => {
        dispatch(receivedRecentRankedMatches(response.data, accountId))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export const getRecentRankedMatchesDetails = (serviceRegion, summonerId, gameId) => {
  console.log('GETTING RANKED MATCH DETAILS')
  return (dispatch) => {
    return axios.get(`/api/recentRankedMatchesDetails?serviceRegion=${serviceRegion}&gameId=${gameId}`)
      .then(response => {
        dispatch(receivedRecentRankedMatchesDetails(response.data, summonerId, gameId))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export const getChampionMastery = (serviceRegion, summonerId, championId) => {
  return (dispatch) => {
    return axios.get(`/api/championMastery?serviceRegion=${serviceRegion}&summonerId=${summonerId}&championId=${championId}`)
      .then(response => {
        dispatch(receivedChampionMastery(response.data, summonerId))
        return response
      }).catch(err => {
        return err.response
      })
  }
}