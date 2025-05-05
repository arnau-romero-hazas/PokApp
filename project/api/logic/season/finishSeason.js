import { User, Season, Game } from '../../data/index.js'

import { errors, validate } from '../../validations/index.js'

const { SystemError, NotAllowedError, NotFoundError } = errors

export const finishSeason = (userId, seasonId) => {
  validate.id(userId, 'userId')
  validate.id(seasonId, 'seasonId')
  
  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('User not found')
      if (user.role !== 'admin') throw new NotAllowedError('Only admins can finish a season')

      return Season.findById(seasonId)
      .catch(error => { throw new SystemError(error.message) })
    })
    .then(season => {
      if (!season) throw new NotFoundError('Season not found')

      //  Buscar todos los juegos finalizados de esta season
      return Game.find({ seasonId: seasonId, status: 'finished' }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(games => {
          const leaderboard = {}

          games.forEach(game => {
            // Asegurar que todos los participantes existan en el leaderboard
            game.participants.forEach(userId => {
                const id = userId.toString()
                if (!leaderboard[id]) leaderboard[id] = 0
            })
        
            if (game.winner) {
                const winnerId = game.winner.toString()
                
                // Asegurar entrada para el ganador
                if (!leaderboard[winnerId]) leaderboard[winnerId] = 0
                // Sumar puntos al ganador
                leaderboard[winnerId] += game.points || 0
        
                // Restar medio punto a los que no ganan
                game.participants.forEach(userId => {
                    const id = userId.toString()
                    if (id !== winnerId) leaderboard[id] -= 0.5
                })
            }
        })

          //  Determinar el jugador con más puntos
          const sorted = Object.entries(leaderboard)
            .map(([userId, points]) => ({ userId, points }))
            .sort((a, b) => b.points - a.points)

          const winnerEntry = sorted[0] // el que tiene más puntos

          //  Actualizar la season
          season.status = 'finished'
          season.winner = winnerEntry?.userId || null

          return season.save()
            .catch(error => { throw new SystemError(error.message)})
            .then(() => {})
        })
        
    })
    
    
}
