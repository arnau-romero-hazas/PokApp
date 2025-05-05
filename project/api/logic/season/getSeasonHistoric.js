import { Game, User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError } = errors

export const getSeasonHistoric = () => {
    return Game.find({  status: 'finished',  seasonName: { $ne: 'casual' }}).lean() 
        .catch(error => { throw new SystemError(error.message) })
        .then(games => {
            if (!games.length) return []

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
                    leaderboard[winnerId] += 1 
                }
            })
        
            // Devolver como array ordenado
            return Object.entries(leaderboard)
                .map(([userId, points]) => ({ userId, points}))
                .sort((a, b) => b.points - a.points)
    })
    .then(leaderboard => {
        // Obtener nombres de usuario para mostrar en frontend
        const userIds = leaderboard.map(e => e.userId)

        return User.find({_id: { $in: userIds } }).lean()
            .catch(error => { throw new SystemError(error.message) })
            .then(users => {
                const userMap = Object.fromEntries(users.map(u => [u._id.toString(), u.username]))

                return leaderboard.map(entry => ({
                    username: userMap[entry.userId] || 'Desconocido',
                    points: entry.points
                }))
            })
    })
}