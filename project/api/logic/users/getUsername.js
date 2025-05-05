import { User } from '../../data/index.js'
import { validate, errors } from '../../validations/index.js'

const { SystemError, NotFoundError } = errors

export const getUsername = (userId) => {
    validate.id(userId, 'userId')

   return User.findById(userId).lean()
        .catch(error => { throw new  SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return user.username
        })
}