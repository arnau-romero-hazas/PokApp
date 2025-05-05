import 'dotenv/config'
import { data, Game, User } from '../../data/index.js'
import { setGameWinner } from './setGameWinner.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { NotAllowedError, NotFoundError, ValidationError } = errors
const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('setGameWinner', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Game.deleteMany({}))
  beforeEach(() => User.deleteMany({}))

  it('succeeds when admin sets a valid winner who is participant', () => {
    const adminId = new ObjectId()
    const winnerId = new ObjectId()
    const gameId = new ObjectId()

    return Promise.all([
      User.create({
        _id: adminId,
        name: 'marc',
        surname: 'ramos',
        email: 'marc@ramos.com',
        username: 'marc_ramos',
        role: 'admin',
        password: '123123123'
      }),
      User.create({
        _id: winnerId,
        name: 'arnau',
        surname: 'romero',
        email: 'arnau@test.com',
        username: 'arnau_romero',
        role: 'regular',
        password: '123123123'
      }),
      Game.create({
        author: adminId,
        title: 'game 1',
        _id: gameId,
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [adminId, winnerId],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => setGameWinner(adminId.toString(), gameId.toString(), winnerId.toString()))
      .then(() => Game.findById(gameId).lean())
      .then(game => {
        expect(game.winner.toString()).to.equal(winnerId.toString())
        expect(game.status).to.equal('finished')
        expect(game.points).to.equal(1.5) // admin(1) + regular(0.5)
      })
  })

  it('fails if user is not admin', () => {
    let catchedError
    const userId = new ObjectId()
    const gameId = new ObjectId()
    const winnerId = new ObjectId()

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
      User.create({
        _id: winnerId,
        name: 'lita',
        surname: 'lenta',
        email: 'lita@test.com',
        username: 'lita_lenta',
        role: 'regular',
        password: '123123123'
      }),
      Game.create({
        author: userId,
        title: 'game 1',
        _id: userId,
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [userId, winnerId],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => setGameWinner(userId.toString(), gameId.toString(), winnerId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotAllowedError)
        expect(catchedError.message).to.equal('Only admins can set winners')
      })
  })

  it('fails if game does not exist', () => {
    const adminId = new ObjectId()
    const gameId = new ObjectId()
    let catchedError

    return User.create({
      _id: adminId,
      name: 'marc',
      surname: 'ramos',
      email: 'marc@ramos.com',
      username: 'marc_ramos',
      role: 'admin',
      password: '123123123'
    })
      .then(() => setGameWinner(adminId.toString(), gameId.toString(), new ObjectId().toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('Game not found')
      })
  })

  it('fails if winner does not exist', () => {
    const adminId = new ObjectId()
    const gameId = new ObjectId()
    let catchedError

    return Promise.all([
      User.create({
        _id: adminId,
        name: 'marc',
        surname: 'ramos',
        email: 'marc@ramos.com',
        username: 'marc_ramos',
        role: 'admin',
        password: '123123123'
      }),
      Game.create({
        author: adminId,
        title: 'game 1',
        _id: gameId,
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [adminId],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => setGameWinner(adminId.toString(), gameId.toString(), new ObjectId().toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('User not found')
      })
  })

  it('fails if winner is not a participant', () => {
    const adminId = new ObjectId()
    const notParticipantId = new ObjectId()
    const gameId = new ObjectId()
    let catchedError

    return Promise.all([
      User.create({
        _id: adminId,
        name: 'marc',
        surname: 'ramos',
        email: 'marc@ramos.com',
        username: 'marc_ramos',
        role: 'admin',
        password: '123123123'
      }),
      User.create({
        _id: notParticipantId,
        name: 'lita',
        surname: 'lenta',
        email: 'lita@test.com',
        username: 'lita_lenta',
        role: 'regular',
        password: '123123123'
      }),
      Game.create({
        author: adminId,
        title: 'game 1',
        _id: gameId,
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [adminId],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => setGameWinner(adminId.toString(), gameId.toString(), notParticipantId.toString()))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(ValidationError)
        expect(catchedError.message).to.equal('Winner must be one of the participants')
      })
  })

  afterEach(() => Game.deleteMany({}))
  afterEach(() => User.deleteMany({}))
  after(() => data.disconnect())
})
