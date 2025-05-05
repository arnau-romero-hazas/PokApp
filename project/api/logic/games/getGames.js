import { Game } from '../../data/index.js'
import { errors } from '../../validations/index.js'

const { SystemError } = errors

export const getGames = () => {
  return Game.find()
    .sort({ date: -1 }) // ordenados por fecha descendente
    .lean()
    .catch(error => { throw new SystemError('Error retrieving events: ' + error.message) })
}

