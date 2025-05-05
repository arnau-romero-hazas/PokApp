import 'dotenv/config'
import { data, Season, User } from '../../data/index.js'
import { getFinishedSeasons } from './getFinishedSeasons.js'
import { expect } from 'chai'
import { Types } from 'mongoose'

const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('getFinishedSeasons', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 

    it('Succeed on get finished Seasons', () => {
        return Promise.all([
            Season.create({
                startDate: new Date(2025, 4, 20),
                endDate: new Date(2025, 4, 21),
                status:'finished',
                name: 'season 1'
            }),
            Season.create({
                startDate: new Date(2025, 4, 22),
                endDate: new Date(2025, 4, 23),
                status:'finished',
                name: 'season 2'
            })
        ])
        .then(() => {
            return getFinishedSeasons()
        })
        .then(seasons =>{
            debugger
            expect(seasons).to.exist

            expect(seasons[0].seasonName).to.equal('season 2')
            expect(seasons[1].seasonName).to.equal('season 1')          
        }) 
    })

    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({}))
    
    after(() => data.disconnect())
})