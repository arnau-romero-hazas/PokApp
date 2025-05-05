import 'dotenv/config'
import { data, Season, User, Game } from '../../data/index.js'
import { finishSeason } from './finishSeason.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { NotFoundError, NotAllowedError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('finishSeason', () =>{
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 
    beforeEach(() => Game.deleteMany({})) 

    it('succeed on finish a season', () => {
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'active',
                name: 'season 1'
            }),
            User.create({ 
                name: 'Arnau',
                surname: 'Romero',
                role: 'admin',
                email: 'arnau@romero.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
        ])
            .then(([season, user]) => {
              return  finishSeason(user._id.toString(), season._id.toString())
            })
            .then(() => {
                return Season.find({})
            })
            .then(seasonFinished => {
                expect(seasonFinished[0].status).to.equal('finished')
            })
    })

    it('Fail: Only admins can finish a season', () => {
        let catchedError
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'active',
                name: 'season 1'
            }),
            User.create({ 
                name: 'Arnau',
                surname: 'Romero',
                email: 'arnau@romero.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([season, user]) => {
                return finishSeason(user.id, season.id)
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotAllowedError)
                expect(catchedError.message).to.equal('Only admins can finish a season')
            })
    })

    it('Fail: User not found', () => {
        let catchedError
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 4, 24),
                status:'active',
                name: 'season 1'
            })
        ])
            .then(([season]) => {
                return finishSeason(new ObjectId().toString(), season.id)
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found')
            })
    })

    it('Fail: Season not found', () => {
        let catchedError
        return Promise.all([
            User.create({ 
                name: 'Arnau',
                surname: 'Romero',
                role: 'admin',
                email: 'arnau@romero.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            })
        ])
            .then(([user]) => {
                return finishSeason(user.id, new ObjectId().toString())
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('Season not found')
            })
    })

    it('Succeeds finishing a season with no games', () => {
        let season
        return Promise.all([
          Season.create({
            startDate: new Date(2025, 4, 23),
            endDate: new Date(2025, 4, 24),
            status: 'active',
            name: 'season vacía'
          }),
          User.create({
            name: 'Admin',
            surname: 'User',
            role: 'admin',
            email: 'admin@user.com',
            username: 'admin_user',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
          })
        ])
        .then(([s, user]) => {
            season = s
            return finishSeason(user.id, season.id)
          })
        .then(() => Season.findById(season._id))
        .then(season => {
          expect(season.status).to.equal('finished')
          expect(season.winner).to.be.null
        })
      })

    it('Succeeds finishing season with games without defined points', () => {
    let seasonId
    return Promise.all([
        User.create({
            name: 'Admin',
            surname: 'Test',
            email: 'admin@test.com',
            username: 'admin_test',
            role: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        }),
        User.create({
            name: 'Player',
            surname: 'One',
            email: 'player@one.com',
            username: 'player_one',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
    ])

    .then(([admin, player]) => 
        Season.create({
            name: 'testSeason',
            startDate: new Date(),
            endDate: new Date(),
            status: 'active'
        }).then(season => {
        seasonId = season._id
        return Game.create({
            author: admin._id,
            title: 'Game 1',
            seasonId: season._id,
            seasonName: 'testSeason',
            date: new Date(),
            place: 'Online',
            status: 'finished',
            participants: [player._id],
            winner: player._id
            // points no definido (undefined)
        }).then(() => finishSeason(admin.id, season.id))
            .then(() => Season.findById(season._id))
            .then(season => {
            expect(season.status).to.equal('finished')
            expect(season.winner.toString()).to.equal(player._id.toString())
            })
        })
    )
    })


    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    afterEach(() => Game.deleteMany({}))
    
    after(() => data.disconnect()) 
})
