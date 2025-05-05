import { User, Game } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError, NotAllowedError } = errors

export const deleteGame = (gameId, userId) => {
    validate.id(gameId, 'gameId')
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) }) 
        .then(user => {
            if (!user) throw new NotFoundError('user not found')
            if (user.role !== 'admin') throw new NotAllowedError('only admin can delete a game')      
                
            return Game.findById(gameId)
                .catch(error => { throw new SystemError(error.message) })
                .then(game => {
                    if (!game) throw new NotFoundError('game not found')
                    
                    return Game.deleteOne({ _id: gameId })
                        .catch(error => { throw new SystemError(error.message) })
                })    
        })
        .then (() => {})
}