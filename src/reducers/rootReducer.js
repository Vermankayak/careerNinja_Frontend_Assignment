import { combineReducers } from 'redux';
import valueReducer from './valueReducer'

const rootReducer = combineReducers({
  values:valueReducer
})

export default rootReducer
