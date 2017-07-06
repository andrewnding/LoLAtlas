import * as actions from '../constants/actionTypes'

const initialState = {
  gameInfo: {},
  realmVersion: ''
}

const currentGameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVED_CURRENT_GAME:
      return {
        ...state,
        gameInfo: action.payload
      }
    case actions.RECEIVED_REALM_VERSION:
      return {
        ...state,
        realmVersion: action.payload
      }
    case actions.RECEIVED_CHAMPION_IMAGES:
      let participantsWithImages = state.gameInfo.participants.map(participant => {
        return { ...participant, championImage: action.payload[participant.championId].image.full }
      })
      return {
        ...state,
        gameInfo: {
          ...state.gameInfo,
          participants: participantsWithImages
        }
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
    default:
      return state
  }
}

export default currentGameReducer