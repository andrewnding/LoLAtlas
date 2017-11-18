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

const receivedMatchDetails = (payload, summonerId, gameId) => {
  return {
    type: actions.RECEIVED_MATCH_DETAILS,
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
    return axios.get(`/api/summonerByAccountId?serviceRegion=${serviceRegion}&summonerId=${summonerId}`)
      .then(response => {
        dispatch(receivedAccountId(response.data.accountId, summonerId))
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
        if (err.response.data.error === 'NO_RECENT_RANKED_MATCHES') {
          dispatch(receivedRecentRankedMatches([], accountId))
        }
        return err.response
      })
  }
}

export const getMatchDetails = (serviceRegion, summonerId, gameId) => {
  console.log('GETTING RANKED MATCH DETAILS')
  return (dispatch) => {
    return axios.get(`/api/matchDetails?serviceRegion=${serviceRegion}&gameId=${gameId}&summonerId=${summonerId}`)
      .then(response => {
        dispatch(receivedMatchDetails(response.data, summonerId, gameId))
        return response
      }).catch(err => {
        return err.response
      })
  }
}

export const getChampionMastery = (serviceRegion, summonerId, championId) => {
  console.log('GETTING CHAMPION MASTERY')
  return (dispatch) => {
    return axios.get(`/api/championMastery?serviceRegion=${serviceRegion}&summonerId=${summonerId}&championId=${championId}`)
      .then(response => {
        dispatch(receivedChampionMastery(response.data, summonerId))
        return response
      }).catch(err => {
        if (err.response.data.error === 'ERROR_GETTING_CHAMPION_MASTERY') {
          dispatch(receivedChampionMastery({ championLevel: 0, championPoints: 0 }, summonerId))
        }
        return err.response
      })
  }
}