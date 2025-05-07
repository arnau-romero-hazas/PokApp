import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { games, users, seasons } from './project/api/routes/index.js' // TODO GAME, SEASON
import { errorHandler } from './project/api/middlewares/index.js'

import { data } from './project/api/data/index.js'

const { PORT, MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
    .catch(console.error)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, API!'))

        api.use('/users', users)
        api.use('/games', games)
        api.use('/seasons', seasons)
       

        api.use(errorHandler)

        api.listen(PORT, '0.0.0.0',  () => console.log(`API running on port ${PORT}`))
    })