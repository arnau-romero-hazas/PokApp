import { Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError } = errors

export const getSeasonById = (seasonId) => {
  validate.id(seasonId)
  return Season.findById(seasonId).lean()
    .catch(err => { throw new SystemError(err.message) })
    .then(season => {
      if (!season) throw new NotFoundError('Season not found')
      return season
    })
}
