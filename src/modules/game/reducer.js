import { SET_GAME, SET_PLAYERS } from './action'

const initState = {
  players: [],
  host: null
}

// eslint-disable-next-line default-param-last
const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_GAME:
      return { ...state, ...action.game }
    case SET_PLAYERS:
      return { ...state, players: action.players }
    default:
      return state
  }
}

export default gameReducer
