import * as actions from '../constants/actionTypes'

const initialState = {
  gameInfo: {},
  realmVersion: '',
  championImages: []
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
      let championImages = []
      action.championIds.map(championId => {
        championImages.push(action.payload[championId])
      })
      return {
        ...state,
        championImages: championImages
      }
    default:
      return state
  }
}

export default currentGameReducer