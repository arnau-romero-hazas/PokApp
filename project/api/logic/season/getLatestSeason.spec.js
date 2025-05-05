import 'dotenv/config'
import { data, Season, User } from '../../data/index.js'
import { getLatestSeason } from './getLatestSeason.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'

const { NotFoundError, SystemError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('getLatestSeason', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 

    it('Succed in get latest season', () => {
       
       return Season.create({
            name: 'season 1',
            status: 'active',
            startDate: new Date(2025, 4, 23),
            endDate: new Date(2025, 4, 24)
       }) 
        .then(() => { return getLatestSeason() })
        .then(lastSeason =>{
            expect(lastSeason).to.exist
            expect(lastSeason.name).to.equal('season 1')
            expect(lastSeason.status).to.equal('active')
        })    
    })

    
    it('fail not found last season', () => {
        let catchedError

        return getLatestSeason() 
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.exist
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('No active season found')
            })
     })



    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({})) // Borramos los usarios después de cada test para que no haya interferencias entre tests.
            
    after(() => data.disconnect()) 
})