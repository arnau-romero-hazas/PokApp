import 'dotenv/config'
import { data, Game, Season, User } from '../../data/index.js'
import { getSeasonHistoric } from './getSeasonHistoric.js'
import { expect } from 'chai'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('getSeasonHistoric', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 
    beforeEach(() => Game.deleteMany({})) 

    it('succed on getSeasonHistoric', () => {
        let seasonId  = new ObjectId()
        let arnauId  = new ObjectId()
        let marcId  = new ObjectId()

        return Promise.all([
            Season.create({
                name: 'Season historic',
                _id: seasonId,
                status: 'active',
                startDate: new Date(2025, 4, 23),
                endDate: new Date(2025, 5, 24)
            }),
            User.create({
                name: 'arnau',
                _id: arnauId,
                surname: 'romero',
                email: 'ar@nau.com',
                username: 'arnau_sots',
                password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
            }),
            Game.create({
                author: arnauId,
                seasonName: 'season 1',
                seasonId: seasonId,
                status: 'finished',
                title: 'timbita 4',
                participants: [arnauId, marcId],
                date: new Date(2025, 4, 29),
                place: 'bodeguita',
                winner: marcId,
                points: 2,
                createdAt: new Date(2025, 4, 29),
                modifiedAt: new Date(2024, 4, 30)
            })
        ])
        .then(() => {
            return getSeasonHistoric()})
        .then(seasonHistoric => {
            debugger
            expect(seasonHistoric).to.exist
            expect(seasonHistoric[0]).to.instanceOf(Object)
            expect(seasonHistoric[0].username).to.equal('Desconocido')
            expect(seasonHistoric[0].points).to.equal(1)
            expect(seasonHistoric).to.be.a('array')
        })
    })

    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    afterEach(() => Game.deleteMany({}))
    
                
    after(() => data.disconnect())
})