import { User } from '../../data/index.js' // Importamos el modelo de Usuarios'
import { errors } from '../../validations/index.js'

const { SystemError } = errors

export const searchUsers = (query) => {
    // Buscamos usuarios cuyo 'username' contenga el texto introducido en el query

    return User.find({ username: { $regex: query, $options: 'i' } }) // 'i' para que sea insensible a mayúsculas/minúsculas
        .select('username') // Solo seleccionamos el campo 'username'
        .lean() // Para devolver un objeto simple (sin métodos de Mongoose)
        .catch(error => { throw new SystemError(error.message) })
        .then(users => {
            const foundUsers = users.map(u => ({ id: u._id.toString(), username: u.username }))
            return foundUsers // Devolvemos los usuarios encontrados
        })
}