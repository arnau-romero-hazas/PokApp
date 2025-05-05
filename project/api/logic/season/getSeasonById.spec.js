import 'dotenv/config'
import { data, Season, User } from '../../data/index.js'
import { getSeasonById } from './getSeasonById.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { ObjectId } = Types
const { NotFoundError, SystemError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('getSeasonById', () =>{
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 

    it('succed getSeasonById', () => {
        return Season.create({
            startDate: new Date(2025, 4, 23),
            endDate: new Date(2025, 4, 24),
            status:'active',
            name: 'season 1'
        })
        .then(season => {
            return getSeasonById(season.id)
        })
        .then(seasonReturned => {
            expect(seasonReturned).to.exist

            expect(seasonReturned.status).to.equal('active')
            expect(seasonReturned.name).to.equal('season 1')
        })
    })

    it('fail on not found a season', () =>{
        let catchedError
        return getSeasonById(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(()=>{
                expect(catchedError).to.be.instanceof(NotFoundError)
                expect(catchedError.message).to.equal('Season not found')
            })
    })

    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({})) 
    
    after(() => data.disconnect()) 
})