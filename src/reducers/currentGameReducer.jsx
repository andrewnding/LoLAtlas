import * as actions from '../constants/actionTypes'

const initialState = {
  gameInfo: {},
  recentRankedMatches: []
}

const currentGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVED_CURRENT_GAME:
      return {
        ...state,
        gameInfo: action.payload
      }
    case actions.RECEIVED_RANKED_LEAGUE:
      let participantsWithLeagues = state.gameInfo.participants.map(participant => {
        if (action.summonerId === participant.summonerId) {
          return { ...participant, rankedData: action.payload } 
        } else {
          return participant
        }
      })
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          participants: participantsWithLeagues
        }
      }
    case actions.RECEIVED_ACCOUNT_ID:
      let participantsWithIds = state.gameInfo.participants.map(participant => {
        if (action.summonerId === participant.summonerId) {
          return { ...participant, accountId: action.payload } 
        } else {
          return participant
        }
      })
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          participants: participantsWithIds
        }
      }
    case actions.RECEIVED_RECENT_RANKED_MATCHES:
      let participantsWithRecentRankedMatches = state.gameInfo.participants.map(participant => {
        if (action.accountId === participant.accountId) {
          return { ...participant, recentRankedMatches: action.payload } 
        } else {
          return participant
        }
      })
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          participants: participantsWithRecentRankedMatches
        }
      }
    case actions.RECEIVED_RECENT_RANKED_MATCHES_DETAILS:
      let participantsWithRecentRankedMatchesDetails = state.gameInfo.participants.map(participant => {
        if (action.summonerId === participant.summonerId) {
          let matches = participant.recentRankedMatches.map(match => {
            if (action.gameId === match.gameId) {
              return { ...match, gameDetails: action.payload }
            } else {
              return match
            }
          })
          return { ...participant, recentRankedMatches: matches }
        } else {
          return participant
        }
      })
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          participants: participantsWithRecentRankedMatchesDetails
        }
      }
    default:
      return state
  }
}

export default currentGameReducer