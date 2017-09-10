import * as actions from '../constants/actionTypes'

const initialState = {
  championData: {},
  championImages: {},
  realmVersion: '',
  summonerSpells: {}
}

const staticDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RECEIVED_REALM_VERSION:
      return {
        ...state,
        realmVersion: action.payload
      }
    case actions.RECEIVED_CHAMPION_IMAGES:
      return {
        ...state,
        championImages: action.payload
      }
    case actions.RECEIVED_CHAMPION_DATA:
      return {
        ...state,
        championData: action.payload
      }
    case actions.RECEIVED_SUMMONER_SPELLS:
      return {
        ...state,
        summonerSpells: action.payload
      }
    default:
      return state
  }
}

export default staticDataReducer