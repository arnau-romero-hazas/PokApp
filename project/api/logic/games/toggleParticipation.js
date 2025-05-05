import { User, Game } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError, NotAllowedError } = errors

export const toggleParticipation = (userId, gameId) => {
    validate.id(userId, 'userId')
    validate.id(gameId, 'gameId')

    return Promise.all([
        User.findById(userId).lean(),
        Game.findById(gameId).lean()
    ])
        .catch(error => { throw new SystemError(error.message) })
        .then(([user, game]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!game) throw new NotFoundError('Game not found')
            if (game.status !== 'scheduled') throw new NotAllowedError('Cannot toggle participation in a finished game')

            const { participants } = game // const participants = game.participants

            const index = participants.findIndex(userObjectId => userObjectId.toString() === userId)

            if (index < 0) {
                participants.push(userId)
            } else {
                participants.splice(index, 1)
            }

            return Game.updateOne({ _id: gameId }, { $set: { participants } })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => {})
        })
}