import { User, Game, Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { ValidationError, NotFoundError, SystemError, NotAllowedError } = errors

export const createGame = async (userId, title, season, date, place, participants = []) => {
  if (!title || !date || !place) throw new ValidationError('Missing required fields')

  validate.id(userId, 'userId')
  validate.title(title)
  validate.season(season)
  validate.date(date)
  validate.place(place)

  const user = await User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })

  if (!user) throw new NotFoundError('User not found')
  if (user.role !== 'admin') throw new NotAllowedError('Only admins can create games')

  const seasonDoc = await Season.findOne({ name: season }).lean()

  // Incluir participantes únicos y asegurar que el admin también esté incluido
  const uniqueParticipants = Array.from(new Set([userId, ...participants]))

  const newGame = new Game({
    author: userId,
    title,
    seasonName: seasonDoc?.name || null,
    seasonId: seasonDoc?._id || null,
    date,
    place,
    status: 'scheduled',
    participants: uniqueParticipants,
    winner: null,
    points: 0
  })

  await newGame.save()
  return newGame._id.toString()
}
