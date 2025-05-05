import { data } from '../../data/index.js'

export const isUserLoggedIn = () =>  { return !!data.setToken() }