import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { User } from '../data/index.js'

import { jsonBodyParser, withErrorHandling, authHandler } from '../middlewares/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env 

export const users = Router()

// Endpoint for register user
users.post('/', jsonBodyParser, withErrorHandling((req, res) => {
    const { name, surname, email,  username,  password } = req.body 

    return logic.registerUser(name, surname, email, username,  password )
        .then(() => res.status(201).send())
}))

// Endpoint for authenticateUser
users.post('/auth', jsonBodyParser, withErrorHandling((req,res) => {
    const { username, password } = req.body

    return logic.authenticateUser(username, password)
        .then(({ id , role }) => {
            const token = jwt.sign({ sub: id, role }, JWT_SECRET)

            res.json({ token })
        })
}))

// Endpoint for getUsername
users.get('/self/username', authHandler, withErrorHandling((req, res) => {
    const { userId } = req

    return logic.getUsername(userId)
        .then(username => res.json({ username }))
}))

// Endpoint para actualizar el rol a admin
users.patch('/admin-request', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { secretWord } = req.body  // Recibimos la palabra secreta desde el cuerpo de la solicitud
  
    // Llamar a la lógica para actualizar el rol a admin
    return logic.requestAdminRole(userId, secretWord)
      .then(() => {
        const token = jwt.sign({ sub: userId, role : 'admin'}, JWT_SECRET)
        
        res.json({ token })
      })
      .catch((error) => {
        res.status(400).send(error.message)  // En caso de error, devolvemos el mensaje del error
      })
  }))

// Endpoint para generar stats de usuario
users.get('/stats', authHandler, withErrorHandling((req, res) => {
  const { userId } = req
  
  // Llamar a la lógica para generar stats del usuario
  return logic.getUserStats(userId)
    .then(stats => res.json(stats))
    .catch(error => res.status(400).send(error.message))
}))

// Endpoint para generar stats de usuario que buscas
users.get('/:id/stats', authHandler, withErrorHandling((req, res) => {
  const { id } = req.params
  
  // Llamar a la lógica para generar stats del usuario
  return logic.getUserStats(id)
    .then(stats => res.json(stats))
    .catch(error => res.status(400).send(error.message))
}))

// Endpoint para estadísticas históricas del usuario
users.get('/stats/historic', authHandler, withErrorHandling((req, res) => {
  const { userId } = req

  return logic.getUserHistoricStats(userId)
    .then(stats => res.json(stats))
}))

// Endpoint para estadísticas históricas de busqueda de un usuario
users.get('/:id/stats/historic', authHandler, withErrorHandling((req, res) => {
  const { id } = req.params

  return logic.getUserHistoricStats(id)
    .then(stats => res.json(stats))
}))

// Endpoint para buscar usuarios por nombre de usuario
users.get('/search', authHandler, withErrorHandling((req, res) => {
    const { query } = req.query; // Obtenemos el parámetro 'query' desde la query string

    // Validamos que se haya recibido el 'query'
    if (!query) {
        return res.status(400).json({ error: 'Query string is required' });
    }

    return logic.searchUsers(query)               // ESTO HACERLO EN LA LOGICA
        .then(foundUsers => res.json(foundUsers)) // Respondemos con la lista de usuarios que coinciden
        .catch(error => res.status(500).json({ error: error.message }));
}));

// Obtener los usernames de participants segun sus Ids
users.post('/usernames', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
  const { ids } = req.body

  return logic.getUsernames(ids)
         .then(usernames => res.json({ usernames })) 
}))

// Obtener info básica de un usuario por ID
users.get('/:id', authHandler, withErrorHandling((req, res) => {
  const { id } = req.params
  
  return logic.getUserById(id)// SEPARAR EN LOGICA
    .then( foundUser => res.json(foundUser) )
}))

