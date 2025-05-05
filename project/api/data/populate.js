import 'dotenv/config'
import { data, User, Game, Season } from '../data/index.js'
import bcrypt from 'bcryptjs'

const { MONGO_URL, MONGO_DB } = process.env

data.connect(MONGO_URL, MONGO_DB)
  .then(() => Promise.all([
    User.deleteMany({}),
    Game.deleteMany({}),
    Season.deleteMany({})
  ]))
  .then(() => bcrypt.hash('123123123', 10))
  .then(hash => {
    return User.insertMany([
      { role: 'admin', name: 'Arnau', surname: 'Romero', email: 'aromerohazas@gmail.com', username: 'arnau_sots', password: hash },
      { role: 'admin', name: 'Marc', surname: 'Ramos', email: 'marcramosjorda@gmail.com', username: 'marcramos13', password: hash },
      { role: 'regular', name: 'Alex', surname: 'Domingo', email: 'domi11@gmail.com', username: 'domi11', password: hash },
      { role: 'regular', name: 'Eyla', surname: 'Garcia', email: 'eyla@gmail.com', username: 'eyla_garcia', password: hash },
      { role: 'regular', name: 'lita', surname: 'lenta', email: 'lita@gmail.com', username: 'lita_lenta', password: hash }
    ])
  })
  .then(([arnau, marc, alex, eyla, lita]) => {
    return Season.insertMany([
      {
        startDate: new Date(2025, 2, 1),
        endDate: new Date(2025, 5, 1),
        status: 'active',
        name: 'season 1',
        participants: [arnau._id, marc._id],
        createdAt: new Date(2025, 2, 1),
        modifiedAt: new Date()
      },
      {
        startDate: new Date(2025, 6, 1),
        endDate: new Date(2025, 9, 1),
        status: 'finished',
        name: 'Winter Season',
        participants: [marc._id, arnau._id],
        createdAt: new Date(2025, 6, 1),
        modifiedAt: new Date()
      },
      {
        startDate: new Date(2025, 6, 1),
        endDate: new Date(2025, 9, 1),
        status: 'active',
        name: 'casual',
        participants: [],
        createdAt: new Date(2025, 6, 1),
        modifiedAt: new Date()
      }
    ]).then(([season1, winter]) => {
      return Game.insertMany([
        {
          author: arnau._id,
          status: 'finished',
          seasonName: 'Winter Season',
          seasonId: winter._id,
          title: 'Saturday night timba',
          participants: [alex._id, marc._id, lita._id],
          date: new Date(2025, 2, 22),
          place: 'Bodega',
          winner: alex._id,
          points: 2,
          createdAt: new Date(2025, 3, 1),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id],
          date: new Date(2025, 2, 24),
          place: 'Bodega',
          winner: arnau._id,
          points: 2,
          createdAt: new Date(2025, 2, 25),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'Winter Season',
          seasonId: winter._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 2, 26),
          place: 'Bodega',
          winner: eyla._id,
          points: 3.5,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'Winter Season',
          seasonId: winter._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 2, 28),
          place: 'Bodega',
          winner: marc._id,
          points: 3.5,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        },
        {
          author: arnau._id,
          status: 'finished',
          seasonName: 'Winter Season',
          seasonId: winter._id,
          title: 'Saturday night timba',
          participants: [alex._id, marc._id, eyla._id],
          date: new Date(2025, 3, 1),
          place: 'Bodega',
          winner: eyla._id,
          points: 2,
          createdAt: new Date(2025, 3, 1),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'scheduled',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 3, 3),
          place: 'Bodega',
          winner: null,
          points: 0,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        },
        {
          author: arnau._id,
          status: 'scheduled',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 3, 5),
          place: 'Bodega',
          winner: null,
          points: 0,
          createdAt: new Date(2025, 3, 5),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 3, 7),
          place: 'Bodega',
          winner: eyla._id,
          points: 3.5,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 3, 9),
          place: 'Bodega',
          winner: arnau._id,
          points: 3.5,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [arnau._id, marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 3, 11),
          place: 'Bodega',
          winner: marc._id,
          points: 2.5,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [marc._id, alex._id, eyla._id, lita._id],
          date: new Date(2025, 3, 13),
          place: 'Bodega',
          winner: marc._id,
          points: 2.5,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        },
        {
          author: marc._id,
          status: 'finished',
          seasonName: 'season 1',
          seasonId: season1._id,
          title: 'Sunday night timba',
          participants: [arnau._id, eyla._id, lita._id],
          date: new Date(2025, 3, 15),
          place: 'Bodega',
          winner: arnau._id,
          points: 2,
          createdAt: new Date(2025, 2, 2),
          modifiedAt: new Date()
        }
      ])
    })
  })
  .then(() => {
    console.log('✅ Datos insertados correctamente.')
  })
  .catch(error => {
    console.error('❌ Error al insertar datos:', error)
  })
  .finally(() => data.disconnect())
