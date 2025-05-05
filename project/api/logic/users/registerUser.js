import { User } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'
import bcrypt from 'bcryptjs'
const { SystemError, DuplicityError } = errors

export const registerUser = (name, surname, email, username, password) =>{
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return bcrypt.hash(password, 10)
        .catch(error => { throw new  SystemError(error.message) })
        .then(hash=> {
            const player = {
                name,
                surname,
                email,
                username,
                password: hash
            }

            return User.create(player)
                .catch(error=> {
                    if (error.code === 11000) throw new DuplicityError('user already exists')
                    
                    throw new SystemError(error.message)
                })
        })
        .then(() => {})
}