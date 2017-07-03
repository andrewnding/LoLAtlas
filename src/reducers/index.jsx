import { combineReducers } from 'redux'
import helloWorldReducer from './helloWorldReducer'
import searchReducer from './searchReducer'

const reducer = combineReducers({
  helloWorldReducer,
  searchReducer
})

export default reducer