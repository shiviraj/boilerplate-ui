import { BFF_URL } from '../config/config'
import users from './modules/user'
import oauth from './modules/oauth'

const API = {
  users: users(BFF_URL),
  oauth: oauth(BFF_URL)
}

export default API
