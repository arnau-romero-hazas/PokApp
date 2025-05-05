import { Season } from '../../data/index.js'
import { errors } from '../../validations/index.js'

const { NotFoundError, SystemError } = errors

export const getLatestSeason = () => {
    return Season.findOne({ status: 'active', name: { $ne: 'casual' }})
      .sort({ startDate: -1 })
      .lean()
      .catch(error => { throw new SystemError(error.message) })
      .then(season => {
        if (!season) throw new NotFoundError('No active season found')
        return season
      })
  }