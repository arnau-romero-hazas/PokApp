import 'dotenv/config'
import { data, Game, User } from '../../data/index.js'
import { toggleParticipation } from './toggleParticipation.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { NotFoundError, NotAllowedError } = errors
const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('toggleParticipation', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => User.deleteMany({}))
  beforeEach(() => Game.deleteMany({}))

  it('succeeds when user joins a game', () => {
    const userId = new ObjectId()
    const gameId = new ObjectId()

    return Promise.all([
      User.create({
        _id: userId,
        name: 'arnau',
        surname: 'romero',
        email: 'arnau@test.com',
        username: 'arnau_romero',
        role: 'regular',
        password: '123123123'
      }),
      Game.create({
        author: userId,
        title: 'game 1',
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
      .then(() => toggleParticipation(userId.toString(), gameId.toString()))
      .then(() => Game.findById(gameId).lean())
      .then(game => {
        expect(game.participants.map(p => p.toString())).to.include(userId.toString())
      })

  })

  it('succeeds when user leaves a game', () => {
    const userId = new ObjectId()
    const gameId = new ObjectId()

    return Promise.all([
      User.create({
        _id: userId,
        name: 'arnau',
        surname: 'romero',
        email: 'arnau@test.com',
        username: 'arnau_romero',
        role: 'regular',
        password: '123123123'
      }),
      Game.create({
        author: userId,
        title: 'game 1',
        _id: gameId,
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [userId],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => toggleParticipation(userId.toString(), gameId.toString()))
      .then(() => Game.findById(gameId).lean())
      .then(game => {
        expect(game.participants).to.not.include(userId.toString())
      })
  })

  it('fails if game is not found', () => {
    let catchedError
    const userId = new ObjectId()
    const gameId = new ObjectId()

    return User.create({
      _id: userId,
      name: 'lita',
      surname: 'lenta',
      email: 'lita@test.com',
      username: 'lita_lenta',
      role: 'regular',
      password: '123123123'
    })
      .then(() => toggleParticipation(userId.toString(), gameId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('Game not found')
      })
  })

  it('fails if user is not found', () => {
    let catchedError
    const userId = new ObjectId()
    const gameId = new ObjectId()

    return  Game.create({
      author: userId,
      title: 'game 1',
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
      .then(() => toggleParticipation(userId.toString(), gameId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('User not found')
      })
  })

  it('fails if game is already finished', () => {
    let catchedError
    const userId = new ObjectId()
    const gameId = new ObjectId()

    return Promise.all([
      User.create({
        _id: userId,
        name: 'arnau',
        surname: 'romero',
        email: 'arnau@test.com',
        username: 'arnau_romero',
        role: 'regular',
        password: '123123123'
      }),
      Game.create({
        author: userId,
        title: 'game 1',
        _id: gameId,
        status: 'finished',
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        date: new Date(2025, 4, 23),
        participants: [],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => toggleParticipation(userId.toString(), gameId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotAllowedError)
        expect(catchedError.message).to.equal('Cannot toggle participation in a finished game')
      })
  })

  afterEach(() => Game.deleteMany({}))
  afterEach(() => User.deleteMany({}))
  after(() => data.disconnect())
})
