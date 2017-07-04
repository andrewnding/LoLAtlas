import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import currentGameReducer from './currentGameReducer'

const reducer = combineReducers({
  searchReducer,
  currentGameReducer
})

export default reducer