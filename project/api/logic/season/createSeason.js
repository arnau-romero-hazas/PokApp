import { User, Season } from '../../data/index.js'
import { validate, errors } from '../../validations/index.js'

const { AuthorizationError, SystemError, DuplicityError } = errors

export const createSeason = (userId, { name, startDate, endDate }) => {
  validate.id(userId, 'userId')
  validate.title(name, 'season name')
  validate.date(startDate, 'start date')
  validate.date(endDate, 'end date')
 
  debugger
  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
    
      if (!user || user.role !== 'admin') throw new AuthorizationError('Only admins can create a season')
    })
    .then(() => { 
      return Season.exists({ status: 'active', name: { $ne: 'casual' } })
        .catch(error => { throw new SystemError(error.message)})
   })
    
    .then(isExist => {
      if (isExist) throw new DuplicityError('There is already an active season')
    })
    .then(() =>{
     return Season.create({
            name: name.toLowerCase(),
            startDate,
            endDate,
            status: 'active',
            participants: []
          })
          .catch(error => { throw new SystemError(error.message)})
    })
    
}
