import dotenv from 'dotenv'
dotenv.config()
import { User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError, ValidationError, CredentialsError } = errors

export const requestAdminRole = (userId, secretWord) => {
    validate.id(userId, 'user id')
    validate.string(secretWord, 'secret word')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')
            if (user.role === 'admin') throw new ValidationError('User is already admin')

            // Verificar palabra secreta
            if (secretWord !== process.env.ADMIN_SECRET_WORD) {
                throw new CredentialsError('Invalid secret word')
            }

            // Actualizar rol
            user.role = 'admin'
            return user.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => {})
        })
}
