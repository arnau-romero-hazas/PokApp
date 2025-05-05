import 'dotenv/config'
import { data, Game, Season, User } from '../../data/index.js'
import { expect } from 'chai'
import { Types } from 'mongoose'
import { getUserHistoricStats } from './getUserHistoricStats.js'

const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('getUserHistoricStats', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 
    beforeEach(() => Game.deleteMany({})) 

    it('succed in getUserHitoricStats', () => {
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
            .then(() => {
               return getUserHistoricStats(arnauId.toString())
            })
            .then(historicStats => {
                debugger
                expect(historicStats).to.exist
                expect(historicStats.gamesPlayed).to.equal(4)
                expect(historicStats.gamesWon).to.equal(1)
                expect(historicStats.points).to.equal(-0.5)
                expect(historicStats.winRate).to.equal(25)

            })
    })

    
    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    afterEach(() => Game.deleteMany({}))
    
                
    after(() => data.disconnect()) 
})