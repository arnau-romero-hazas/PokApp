import { User, Game, Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { ValidationError, NotFoundError, SystemError, NotAllowedError } = errors

export const createGame = (userId, title, season, date, place) => {
  if (!title || !date || !place) throw new ValidationError('Missing required fields')
 
  validate.id(userId, 'userId')
  validate.title(title)
  validate.season(season)
  validate.date(date)
  validate.place(place)

  return User.findById(userId)
    .catch(error => {throw new SystemError(error.message)} )
    .then(user => {

      if (!user) throw new NotFoundError('User not found')

      if (user.role !== 'admin') throw new NotAllowedError('Only admins can create games')
      
      return Season.findOne({ name: season }).lean()
    })
   
  
    .then(season => {
      const newGame = new Game({
        author: userId,
        title,
        seasonName: season.name || null,
        seasonId: season._id || null,
        date,
        place,
        status: 'scheduled',
        participants: [],
        winner: null,
        points: 0
      })
  
      return newGame.save()
     })
    
}