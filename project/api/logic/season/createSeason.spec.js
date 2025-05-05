import 'dotenv/config'
import { data, Season, User } from '../../data/index.js'
import { createSeason } from './createSeason.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'

const { AuthorizationError, SystemError, DuplicityError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('createSeason',() => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => Season.deleteMany({})) 
    beforeEach(() => User.deleteMany({})) 
    
    it('succeed in create a season', () =>{
        const startDate = new Date(2025, 4, 23).toISOString()
        const endDate = new Date(2025, 4, 24).toISOString()

        return User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'ar@nau.com',
            username: 'arnau_sots',
            role: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user =>  createSeason(user.id, { name:'season 1', startDate, endDate} ))
            .then(() => Season.findOne({ name: 'season 1' }).lean())
            .then(season => {
                expect(season).to.exist
                expect(season.name).to.equal('season 1')

                expect(season.status).to.equal('active')
            })
    })

    it('fail: You are not an admin', () => {
        let catchedError

        return User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'ar@nau.com',
            username: 'arnau_sots',
            role: 'regular',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return createSeason(user.id, { name:'season 1', startDate: new Date(2025, 4, 23).toISOString(), endDate: new Date(2025, 4, 24).toISOString()})
            })
            .catch(error => catchedError = error)
            .finally(() =>{
                expect(catchedError).to.be.instanceOf(AuthorizationError)
                expect(catchedError.message).to.equal('Only admins can create a season')
            })
    })

    it('Create a season when is already existing an active season',() => {
        let catchedError
        const startDate = new Date(2025, 4, 23).toISOString()
        const endDate = new Date(2025, 4, 24).toISOString()
        
        return Promise.all([Season.create({
            name: 'season 1',
            status: 'active',
            startDate: new Date(2025, 4, 23).toISOString(),
            endDate: new Date(2025, 4, 24).toISOString()

        }),
        User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'ar@nau.com',
            username: 'arnau_sots',
            role: 'admin',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
    ])
            .then(([season, user]) => {
                return createSeason(user.id, { name:'season 1', startDate, endDate})
            })
            .catch(error => catchedError = error)
            .finally(() => {
                debugger
                expect(catchedError).to.be.instanceOf(DuplicityError)
                expect(catchedError.message).to.equal('There is already an active season')
            })
    })

    afterEach(() => Season.deleteMany({}))
    afterEach(() => User.deleteMany({})) // Borramos los usarios después de cada test para que no haya interferencias entre tests.
    
    after(() => data.disconnect()) 
})