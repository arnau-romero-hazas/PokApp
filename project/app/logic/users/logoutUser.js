import { data } from '../../data/index.js'

export const logoutUser = () => { return data.setToken(null) }