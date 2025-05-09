import dotenv from 'dotenv'
dotenv.config()
import { User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError, NotAllowedError} = errors

export const roleGuestVip = (id, userId) => {
    validate.id(id, 'adminId')
    validate.id(userId, 'user id')
    
    return User.findById(id)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            // Comprobamos que el usuario que esta cambiando el rol es admin
            if (!user) throw new NotFoundError('User not found')
            if (user.role !== 'admin') throw new NotAllowedError('You are not allowed to change role')
        })
        .then(() => User.findById(userId))
        .catch(error => { throw new SystemError(error.message) })
        // Cambiamos rol al usuario seleccionado a invitado VIP
        .then(userId => {
            if (!userId) throw new NotFoundError('userId not found')
            if (userId.role === 'guestVIP') throw new NotAllowedError('This user is already guestVIP')

            // Actualizar rol
            userId.role = 'guestVIP'
            return userId.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => {})
        })

}
