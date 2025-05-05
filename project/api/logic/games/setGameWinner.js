import { Game, User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { NotAllowedError, NotFoundError, ValidationError } = errors

export const setGameWinner = (adminId, gameId, winnerId) => {
  validate.id(adminId, 'adminId')
  validate.id(gameId, 'gameId')
  validate.id(winnerId, 'winnerId')

  return User.findById(adminId).lean()
    .then(admin => {
      if (!admin || admin.role !== 'admin') throw new NotAllowedError('Only admins can set winners')

      return Promise.all([
        Game.findById(gameId),
        User.findById(winnerId).lean(),
      ])
    })
    .then(([game ,user]) => {
      if (!game) throw new NotFoundError('Game not found')
      if (!user) throw new NotFoundError('User not found')

      if (!game.participants.toString().includes(user._id.toString())) {
        throw new ValidationError('Winner must be one of the participants')
      }

      return User.find({ _id: { $in: game.participants } })
        .then(participants => {
          let points = 0
          participants.forEach(p => {
            points += p.role === 'admin' ? 1 : 0.5
          })

          game.winner = user._id
          game.points = points
          game.status = 'finished'

          return game.save()
        })
    })
}

export default setGameWinner