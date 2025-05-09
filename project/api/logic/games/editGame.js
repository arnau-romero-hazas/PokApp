import { User, Game } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { ValidationError, NotFoundError, NotAllowedError } = errors

export const editGame = async (userId, gameId, { title, date, place, participants }) => {
    validate.id(userId, 'userId')
    validate.id(gameId, 'gameId')
    if (title) validate.title(title)
    if (date) validate.date(date)
    if (place) validate.place(place)
    if (participants) {
      if (!Array.isArray(participants)) throw new ValidationError('Participants must be an array')
      participants.forEach(id => validate.id(id, 'participantId'))
    }
  
    const user = await User.findById(userId)
    if (!user) throw new NotFoundError('User not found')
    if (user.role !== 'admin') throw new NotAllowedError('Only admins can edit games')
  
    const game = await Game.findById(gameId)
    if (!game) throw new NotFoundError('Game not found')
  
    if (title) game.title = title
    if (date) game.date = date
    if (place) game.place = place
    if (participants) game.participants = Array.from(new Set(participants))
  
    await game.save()
  }
  