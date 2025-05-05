import 'dotenv/config'
import { getUserStats } from './getUserStats.js'
import { expect } from 'chai'
import { data, User, Game, Season } from '../../data/index.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('getUserStats', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => Game.deleteMany({}))

    it('succeeds on get user stats', () => {
        let arnauId  = new ObjectId()
        const seasonId = new ObjectId()
        return Promise.all([
            User.create({
                name: 'arnau',
                _id: arnauId,
                surname: 'romero',
                email: 'ar@nau.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            Season.create({
                name: 'season 2',
                _id: seasonId,
                status: 'active',
                startDate: new Date(2025, 3, 31),
                endDate: new Date(2025, 6, 13)
            }),
            Game.create({
                author: arnauId,
                seasonName: 'season 2',
                seasonId: seasonId,
                status: 'finished',
                title: 'timbita 4',
                participants: [arnauId],
                date: new Date(2025, 3, 31),
                place: 'bodeguita',
                winner: arnauId,
                points: 1,
                createdAt: new Date(2025, 4, 29),
                modifiedAt: new Date(2025, 4, 30)
            })
        ])
        .then(() => {
            debugger
            return getUserStats(arnauId.toString())
        })
        .then((stats) => {
            expect(stats).to.exist
            expect(stats).to.be.an('object')
            expect(stats.gamesPlayed).to.be.a('number').and.equal(1)
            expect(stats.gamesWon).to.be.a('number').and.equal(1)
            expect(stats.winRate).to.be.a('number').and.equal(100)
        })
    })

    it('returns 0 if user has no participation in finished games', () => {
        let litaId = new ObjectId()
        let arnauId  = new ObjectId()
        const seasonId = new ObjectId()
      
        return Promise.all([
          User.create({
            name: 'Lita',
            _id: litaId ,
            surname: 'Lenta',
            email: 'li@ta.com',
            username: 'lita_lenta',
            password: '123123123'
          }),
          Season.create({
            name: 'winter season',
            _id: seasonId,
            status: 'active',
            startDate: new Date(),
            endDate: new Date()
          }),
          Game.create({
            author: arnauId,
            seasonName: 'season 2',
            seasonId: seasonId,
            status: 'finished',
            title: 'timbita 4',
            participants: [arnauId],
            date: new Date(2025, 3, 31),
            place: 'bodeguita',
            winner: arnauId,
            points: 1,
            createdAt: new Date(2025, 4, 29),
            modifiedAt: new Date(2025, 4, 30)
        })
        ])
          .then(() => getUserStats(litaId.toString()))
          .then(stats => {
            expect(stats.gamesPlayed).to.equal(0)
            expect(stats.gamesWon).to.equal(0)
            expect(stats.winRate).to.equal(0)
          })
    })

    it('Returns all stats 0 if there are not an active season', () => {
        let litaId = new ObjectId()
        const seasonId = new ObjectId()
      
        return Promise.all([
          User.create({
            name: 'Lita',
            _id: litaId ,
            surname: 'Lenta',
            email: 'li@ta.com',
            username: 'lita_lenta',
            password: '123123123'
          }),
          Season.create({
            name: 'winter season',
            _id: seasonId,
            status: 'finished',
            startDate: new Date(),
            endDate: new Date()
          }),
        
        ])
          .then(() => getUserStats(litaId.toString()))
          .then(stats => {
            expect(stats.gamesPlayed).to.equal(0)
            expect(stats.gamesWon).to.equal(0)
            expect(stats.winRate).to.equal(0)
            expect(stats.points).to.equal(0)
          })


    })

    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    afterEach(() => Game.deleteMany({}))
        
    after(() => data.disconnect()) 
})