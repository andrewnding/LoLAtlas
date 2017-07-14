import { combineReducers } from 'redux'
import searchReducer from './searchReducer'
import currentGameReducer from './currentGameReducer'
import staticDataReducer from './staticDataReducer'

const reducer = combineReducers({
  searchReducer,
  currentGameReducer,
  staticDataReducer
})

export default reducer