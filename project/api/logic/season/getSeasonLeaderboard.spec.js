import 'dotenv/config'
import { data, Game, Season, User } from '../../data/index.js'
import { getSeasonLeaderboard } from './getSeasonLeaderboard.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { NotFoundError, SystemError } = errors
const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('getSeasonLeaderboard', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 
    beforeEach(() => Game.deleteMany({})) 

    it('succed on get seasonLaderBoard', () => {
        let createdSeason
        let seasonId
        let arnauId 
        let marcId
        let eylaId
        let litaId

        return Promise.all([
            Season.create({
            name: 'season 1',
            _id: seasonId = new ObjectId(),
            status: 'active',
            startDate: new Date(2025, 4, 23),
            endDate: new Date(2025, 5, 24)
        }),
        User.create({
            name: 'arnau',
            _id: arnauId = new ObjectId(),
            surname: 'romero',
            email: 'ar@nau.com',
            username: 'arnau_sots',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        }),
        User.create({
            name: 'marc',
            _id: marcId = new ObjectId(),
            surname: 'ramos',
            email: 'ra@mos.com',
            username: 'marc_ramos',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        }),
        User.create({
            name: 'eyla',
            _id: eylaId = new ObjectId(),
            surname: 'garcia',
            email: 'ey@la.com',
            username: 'eyla_garcia',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        }),
        User.create({
            name: 'lita',
            _id: litaId = new ObjectId(),
            surname: 'lenta',
            email: 'li@ta.com',
            username: 'lita_lenta',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
        
    ])
            .then(([season]) => { 
                createdSeason = season 
            })
            .then(() => Promise.all([
                Game.create({
                    author: arnauId,
                    seasonName: 'season 1',
                    seasonId: seasonId,
                    status: 'finished',
                    title: 'timbita 1',
                    participants: [arnauId, litaId],
                    date: new Date(2025, 4, 23),
                    place: 'bodeguita',
                    winner: arnauId,
                    points: 1,
                    createdAt: new Date(2025, 4, 25),
                    modifiedAt: new Date(2024, 4, 26)

                }),
                Game.create({
                    author: arnauId,
                    seasonName: 'season 1',
                    seasonId: seasonId,
                    status: 'finished',
                    title: 'timbita 2',
                    participants: [arnauId, marcId, eylaId, litaId],
                    date: new Date(2025, 4, 29),
                    place: 'casita sots',
                    winner: eylaId,
                    points: 2,
                    createdAt: new Date(2025, 4, 27),
                    modifiedAt: new Date(2024, 4, 28)
                }),
                Game.create({
                    author: arnauId,
                    seasonName: 'season 1',
                    seasonId: seasonId,
                    status: 'finished',
                    title: 'timbita 3',
                    participants: [arnauId, marcId,eylaId, litaId],
                    date: new Date(2025, 4, 29),
                    place: 'bodeguita',
                    winner: marcId,
                    points: 4,
                    createdAt: new Date(2025, 4, 29),
                    modifiedAt: new Date(2024, 4, 30)
                }),
                Game.create({
                    author: arnauId,
                    seasonName: 'season 1',
                    seasonId: seasonId,
                    status: 'finished',
                    title: 'timbita 4',
                    participants: [arnauId, marcId,eylaId, litaId],
                    date: new Date(2025, 4, 29),
                    place: 'bodeguita',
                    winner: marcId,
                    points: 2,
                    createdAt: new Date(2025, 4, 29),
                    modifiedAt: new Date(2024, 4, 30)
                })
            ]))
            .then(()=> {
                debugger
                 return getSeasonLeaderboard(seasonId.toString())})
            .then(seasonLeaderboard => {
                expect(seasonLeaderboard).to.exist

                // Verify usernames and keys exist in leaderboard
                expect(seasonLeaderboard[0]).to.be.an('object')

                expect(seasonLeaderboard[0]).to.have.all.keys('username', 'points')
                expect(seasonLeaderboard[0].username).to.be.a('string')
                expect(seasonLeaderboard[0].points).to.be.a('number')

                expect(seasonLeaderboard[1]).to.be.an('object')

                expect(seasonLeaderboard[1]).to.have.all.keys('username', 'points')
                expect(seasonLeaderboard[1].username).to.be.a('string')
                expect(seasonLeaderboard[1].points).to.be.a('number')

                
                expect(seasonLeaderboard[2]).to.be.an('object')

                expect(seasonLeaderboard[2]).to.have.all.keys('username', 'points')
                expect(seasonLeaderboard[2].username).to.be.a('string')
                expect(seasonLeaderboard[2].points).to.be.a('number')

                expect(seasonLeaderboard[3]).to.be.an('object')

                expect(seasonLeaderboard[3]).to.have.all.keys('username', 'points')
                expect(seasonLeaderboard[3].username).to.be.a('string')
                expect(seasonLeaderboard[3].points).to.be.a('number')

                // Verify username and points
                //Usuario 1
                debugger
                expect(seasonLeaderboard[0]['username']).to.equal('marc_ramos')
                expect(seasonLeaderboard[0]['points']).to.equal(5.5)
                //Usuario 2
                expect(seasonLeaderboard[1]['username']).to.equal('eyla_garcia')
                expect(seasonLeaderboard[1]['points']).to.equal(1)
                //Usuario 3
                expect(seasonLeaderboard[2]['username']).to.equal('arnau_sots')
                expect(seasonLeaderboard[2]['points']).to.equal(-0.5)
                //Usuario 4
                expect(seasonLeaderboard[3]['username']).to.equal('lita_lenta')
                expect(seasonLeaderboard[3]['points']).to.equal(-2)
            })
    })



    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    afterEach(() => Game.deleteMany({}))
    
                
    after(() => data.disconnect()) 
})