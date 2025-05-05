import 'dotenv/config'
import { data, User } from '../../data/index.js'
import { searchUsers } from './searchUsers.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'

const { NotFoundError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('searchUsers', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))
    beforeEach(() => User.deleteMany({}))

    it('succed on searchUsers', () => {

        return Promise.all([
            User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'arnau@gmail.com',
            username: 'arnau_sots',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        }),
        User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'marc@tonto.com',
            username: 'arnaldo_romero',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
    ])
            .then(() => {
                return searchUsers('a')
            })
            .then(user => {
                debugger
                expect(user).to.exist
                expect(user).to.be.a('array')
                expect(user[0].username).to.equal('arnaldo_romero')
                expect(user[1].username).to.equal('arnau_sots')
            })
    })

    afterEach(() => User.deleteMany({}))                 
    after(() => data.disconnect()) 
})