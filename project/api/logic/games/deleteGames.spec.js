import 'dotenv/config'
import { data, User, Game } from '../../data/index.js'
import { deleteGame } from './deleteGame.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { NotFoundError, NotAllowedError} = errors
const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('deleteGame', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => User.deleteMany({}))
  beforeEach(() => Game.deleteMany({}))

  it('succeeds when an admin deletes an existing game', () => {
    debugger
    const gameId = new ObjectId()
    const userId = new ObjectId()

    return Promise.all([
      User.create({  
        _id: userId,
        name: 'marc',
        surname: 'ramos',
        email: 'marc@ramos.com',
        username: 'marcramos',
        role: 'admin',
        password: '123123123'
      }),
      Game.create({
        author: userId,
        title: 'timba',
        _id: gameId,
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() =>{ 
        return deleteGame(gameId.toString(), userId.toString()) 
      })
      .then(() => Game.findById(gameId))
      .then(game => expect(game).to.be.null)
  })

  it('fails if user is not admin', () => {
    let catchedError
    const marcId = new ObjectId()
    const gameId = new ObjectId()

    return Promise.all([
      User.create({
        _id: marcId,
        name: 'marc',
        surname: 'ramos',
        email: 'marc@ramos.com',
        username: 'marcramos',
        role: 'regular',
        password: '123123123'
      }),
      Game.create({
        author: marcId,
        title: 'timba',
        _id: gameId,
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => deleteGame(gameId.toString(), marcId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotAllowedError)
        expect(catchedError.message).to.equal('only admin can delete a game')
      })
  })

  it('fails if game does not exist', () => {
    let catchedError
    const gameId = new ObjectId()
    const marcId = new ObjectId()

    return User.create({
        _id: marcId,
        name: 'marc',
        surname: 'ramos',
        email: 'marc@ramos.com',
        username: 'marcramos',
        role: 'admin',
        password: '123123123'
    })
      .then(() => deleteGame(gameId.toString(), marcId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('game not found')
      })
  })

  it('fails if user does not exist', () => {
    let catchedError
    const marcId = new ObjectId()
    const gameId = new ObjectId()

    return  Game.create({
      author: marcId,
      title: 'timba',
      _id: gameId,
      seasonName: 'season 1',
      seasonId: new ObjectId(),
      status: 'scheduled',
      date: new Date(2025, 4, 23),
      participants: [],
      place: 'bodeguita',
      winner: null,
      points: 0
    })
      .then(() => deleteGame(gameId.toString(), marcId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('user not found')
      })
  })

  afterEach(() => Game.deleteMany({}))
  afterEach(() => User.deleteMany({}))
  after(() => data.disconnect())
})
