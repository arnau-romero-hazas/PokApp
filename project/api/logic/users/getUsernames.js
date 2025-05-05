import { User } from '../../data/index.js'
import { validate, errors } from '../../validations/index.js'

const { SystemError} = errors

export const getUsernames = (ids) => {
    validate.idArray(ids)

   return User.find({ _id: { $in: ids } }).lean() 
        .catch(error => { throw new  SystemError(error.message) })
        .then(users => {
            const usernames = users.map(user => ({
                id: user._id.toString(),
                username: user.username
            }))

            return usernames
        })
}