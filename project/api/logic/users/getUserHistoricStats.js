import { Game } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError } = errors

export const getUserHistoricStats = (userId) => {
  validate.id(userId, 'userId')

  return Game.find({ status: 'finished', seasonId: { $ne: null } }).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(games => {
      let gamesPlayed = 0
      let gamesWon = 0
      let points = 0

      games.forEach(game => {
        const participated = game.participants.some(p => p.toString() === userId)
        if (participated) {
          gamesPlayed++

          const won = Array.isArray(game.winner)
            ? game.winner.some(p => p.toString() === userId)
            : game.winner?.toString() === userId

          if (won) {
            gamesWon++
            points += game.points || 0
          } else {
            points -= 0.5
          }
        }
      })

      const winRate = gamesPlayed ? Math.round((gamesWon / gamesPlayed) * 1000) / 10 : 0

      return {
        gamesPlayed,
        gamesWon,
        winRate,
        points
      }
    })
}