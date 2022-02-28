import { combineReducers } from 'redux'
import siteReducer from '../modules/home/reducer'
import userReducer from '../modules/user/reducer'
import gameReducer from '../modules/game/reducer'

const reducer = combineReducers({
  site: siteReducer, user: userReducer, game: gameReducer
})

export default reducer
