export const GAME = 'GAME'

export const SET_GAME = `SET_${GAME}`
export const SET_PLAYERS = `SET_${GAME}_PLAYERS`

export const setGame = (game) => ({ type: SET_GAME, game })
export const setPlayers = (players) => ({ type: SET_PLAYERS, players })
