import { Game, Season } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError} = errors

export const getUserStats = (userId) => {
  validate.id(userId, 'userId')

  return Season.findOne({ status: 'active', name: { $ne: 'casual' } })
    .catch(error => { throw new SystemError(error.message) })
    .then(season => {
      
      if (!season) { // if there are not a acitve season we return all the stats in 0
        let gamesPlayed = 0
        let gamesWon = 0
        let winRate = 0
        let points = 0
        return {
          gamesPlayed,
          gamesWon,
          winRate,
          points
        }
      }

      return season
    })
    .then(season => {
      return Game.find({ seasonId: season._id, status: 'finished' }).lean()
        .catch(error => { throw new SystemError(error.message) })
  })
    .then(games => {
      let gamesPlayed = 0
      let gamesWon = 0
      let points = 0

      games.forEach(game => {
        const participated = game.participants.some(p => p.toString() === userId)
        if (participated) {
          gamesPlayed++

          const won = game.winner?.toString() === userId

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

export default getUserStats