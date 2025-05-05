import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { jsonBodyParser, withErrorHandling, authHandler } from '../middlewares/index.js'
import { logic } from '../logic/index.js'

const { JWT_SECRET } = process.env 

export const seasons = Router()

// Endpoint para calcular la tabla de classificación
seasons.get('/:id/leaderboard', authHandler, withErrorHandling((req, res) => {
    const { id: seasonId } = req.params

    return logic.getSeasonLeaderboard(seasonId)
        .then(leaderboard => res.json(leaderboard))
}))

// Marcar una season como finalizada (solo admin)
seasons.patch('/:id/finish', authHandler, withErrorHandling((req, res) => {
    const { userId } = req
    const { id: seasonId } = req.params
  
    return logic.finishSeason(userId, seasonId)
      .then(() => res.status(204).send())
  }))

  // Obtener la última temporada activa
seasons.get('/latest', authHandler, withErrorHandling((req, res) => {
    return logic.getLatestSeason()
      .then(season => res.json(season))
  }))
  
  // Crear nueva season (solo admin)
seasons.post('/', authHandler, jsonBodyParser, withErrorHandling((req, res) => {
  const { userId } = req
  const { name, startDate, endDate } = req.body

  return logic.createSeason(userId, { name, startDate, endDate })
    .then(() => res.status(201).send())
}))

// Obtener la sesion historica
seasons.get('/historic', authHandler, withErrorHandling((req, res) => {
  
  return logic.getSeasonHistoric()
  .then(leaderboard => res.json(leaderboard))
}))

// Obtener las seasons finalizadas
seasons.get('/finished', authHandler, withErrorHandling((req, res) => {
  return logic.getFinishedSeasons()
  .then(returnedSeasons => { res.json({ returnedSeasons }) })
}))

// Obtener una season por ID
seasons.get('/:id', authHandler, withErrorHandling((req, res) => {
  const { id: seasonId } = req.params

  return logic.getSeasonById(seasonId)
    .then(season => res.json(season))
}))