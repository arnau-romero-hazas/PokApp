import { Router } from 'express'

import { jsonBodyParser, withErrorHandling, authHandler } from '../middlewares/index.js'
import { logic } from '../logic/index.js'

export const games = Router()

// Crear partida (solo admin)
games.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
    const { userId } = req
    const { title, season, date, place } = req.body
  
    return logic.createGame(userId, title, season, date, place)
      .then(gameId => res.status(201).json({ gameId }))
  }))
  
  // Funcion para obtener los games
  games.get('/', authHandler, withErrorHandling((req, res) => {
    return logic.getGames()
      .then(games => res.json({ games }))
  }))

  // Funcion para participar y desapuntarse
  games.patch('/:gameId/participation', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { gameId } = req.params

    return logic.toggleParticipation(userId, gameId)
      .then(() => res.status(204).send())
  }))

  // EndPoint para setear ganador
  games.patch('/:gameId/winner', authHandler, jsonBodyParser,  withErrorHandling((req, res) => {
    const { gameId } = req.params
    const { winnerId } = req.body
    const { userId } = req
  
    return logic.setGameWinner(userId, gameId, winnerId)
      .then(() => res.status(204).send())
  }))

// EndPoint para borrar juego 
  games.delete('/:gameId', authHandler, withErrorHandling((req, res) => {
    const { gameId } = req.params
    const { userId } = req
    
    return logic.deleteGame(gameId, userId)
      .then(() => res.status(204).send())
  }))