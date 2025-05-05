import 'dotenv/config'
import { data, User } from '../../data/index.js'
import { getUsername } from './getUsername.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { NotFoundError } = errors

const { MONGO_URL, MONGO_DB } = process.env
const { ObjectId } = Types

describe('getUsername', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on existing user', () => {
        let returnedUsername
        
        return User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'arnau@gmail.com',
            username: 'arnau_sots',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => getUsername(user.id))
            .then(username => returnedUsername = username)
            .finally(() => expect(returnedUsername).to.equal('arnau_sots'))
    })

    
    it('fails on non-existing user', () => {
        let catchedError

        return getUsername(new ObjectId().toString())
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceOf(NotFoundError)
                expect(catchedError.message).to.equal('User not found')
            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => data.disconnect())
})