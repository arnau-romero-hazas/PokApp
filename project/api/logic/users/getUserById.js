import  { User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const { SystemError, NotFoundError } = errors

export const getUserById = (id) => {
    validate.id(id)

    return User.findById(id).lean()
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new NotFoundError('User not found')
            
            const foundUser = { id: user._id.toString(), username: user.username }
           
            return foundUser 
          })
}