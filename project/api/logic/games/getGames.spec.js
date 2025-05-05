import 'dotenv/config'
import { data, Game } from '../../data/index.js'
import { getGames } from './getGames.js'
import { expect } from 'chai'
import { Types } from 'mongoose'

const { ObjectId } = Types
const { MONGO_URL, MONGO_DB } = process.env

describe('getGames', () => {
  before(() => data.connect(MONGO_URL, MONGO_DB))

  beforeEach(() => Game.deleteMany({}))

  it('succeeds and returns all games ordered by date descending', () => {
    const authorId = new ObjectId()

    return Promise.all([
      Game.create({
        author: authorId,
        title: 'game 1',
        _id: new ObjectId(),
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 23),
        participants: [],
        place: 'bodeguita',
        winner: null,
        points: 0
      }),
      Game.create({
        author: authorId,
        title: 'game 2',
        _id: new ObjectId(),
        seasonName: 'season 1',
        seasonId: new ObjectId(),
        status: 'scheduled',
        date: new Date(2025, 4, 25),
        participants: [],
        place: 'bodeguita',
        winner: null,
        points: 0
      })
    ])
      .then(() => getGames())
      .then(games => {
        expect(games).to.be.an('array').with.lengthOf(2)
        expect(games[0].title).to.equal('game 2')
        expect(games[1].title).to.equal('game 1')
      })
  })

  it('returns empty array if there are no games', () => {
    return getGames()
      .then(games => {
        expect(games).to.be.an('array').that.is.empty
      })
  })

  afterEach(() => Game.deleteMany({}))
  after(() => data.disconnect())
})
