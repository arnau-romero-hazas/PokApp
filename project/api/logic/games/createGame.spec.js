import 'dotenv/config'
import { data, Game, User, Season} from '../../data/index.js'
import { createGame } from './createGame.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { NotFoundError, ValidationError, NotAllowedError } = errors
const { MONGO_URL, MONGO_DB } = process.env

describe('createGame', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Promise.all([
    User.deleteMany({}),
    Game.deleteMany({}),
    Season.deleteMany({})
  ]))

  it('succeeds in creating a game', () => {
    const title = 'Poker Night'
    const season = 'season 1'
    const date = new Date(2025, 4, 24).toISOString()
    const place = 'Casa Arnau'
    return Promise.all([
      User.create({
      name: 'arnau',
      surname: 'romero',
      email: 'ar@nau.com',
      username: 'arnau_sots',
      role: 'admin',
      password: '123123123'
    }), 
    Season.create({
      startDate: new Date(2025, 4, 23).toISOString(),
      endDate: new Date(2025, 4, 24).toISOString(),
      status:'active',
      name: 'season 1'
  }),
  ])
      .then(([ user, season ])=> { 
         debugger
         return createGame(user._id.toString(), title, season.name, date, place) })
      .then(game => {
        expect(game).to.exist
        expect(game.title).to.equal('Poker Night')
        expect(game.seasonName).to.equal('season 1')
        expect(game.place).to.equal('Casa Arnau')
        expect(game.status).to.equal('scheduled')
        
      })
  })

  it('fails if user is not admin', () => {
    let catchedError

    return User.create({
      name: 'marc',
      surname: 'ramos',
      email: 'marc@ramos.com',
      username: 'marc_ramos',
      role: 'regular',
      password: '123123123'
    })
      .then(user => createGame(user.id, 'timbita', 'season 1', '22-04-2025', 'casa roca') )
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotAllowedError)
        expect(catchedError.message).to.equal('Only admins can create games')
      })
  })

  it('fails if are missing required fields', () => {
    let catchedError

    return User.create({
      name: 'arnau',
      surname: 'romero',
      email: 'ar@nau.com',
      username: 'arnau_sots',
      role: 'admin',
      password: '123123123'
    })
      .then(user => createGame(user._id.toString(), '', 'season 1', '', ''))
      .catch(error => catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(ValidationError)
        expect(catchedError.message).to.equal('Missing required fields')
      })
  })

  it('Fail: User not Found', () => {
    let catchedError

    return createGame(new ObjectId().toString(), 'title', 'season', new Date(2025, 5, 28).toISOString(), 'casita')
      .catch(error =>  catchedError = error)
      .finally(() => {
        expect(catchedError).to.be.instanceOf(NotFoundError)
        expect(catchedError.message).to.equal('User not found')
      })

  })

  afterEach(() => Promise.all([
    User.deleteMany({}),
    Game.deleteMany({}),
    Season.deleteMany({})
  ]))

  after(() => data.disconnect())
})
