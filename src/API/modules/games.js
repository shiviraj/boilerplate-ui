import axios from '../axios'
import { METHODS } from '../constants'

const games = (host = '') => {
  return {
    initGame(game) {
      const options = { method: METHODS.POST, data: game }
      return axios.fetch(`${host}/start`, options)
    },
    getStatus(gameId) {
      return axios.fetch(`${host}/${gameId}/status`)
    },
    startGame(gameId) {
      return axios.fetch(`${host}/${gameId}/start`)
    }
  }
}


export default games
