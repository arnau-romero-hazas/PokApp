import 'dotenv/config'
import { data, User } from '../../data/index.js'
import { requestAdminRole } from './requestAdminRole.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'
import { Types } from 'mongoose'

const { ValidationError, NotFoundError, CredentialsError } = errors
const { ObjectId } = Types

const { MONGO_URL, MONGO_DB } = process.env

describe('requestAdminRole', () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({}))

    it('succeeds on request admin role', () => {

        return User.create({
            name: 'arnau',
            surname: 'romero',
            email: 'ar@nau.com',
            username: 'arnausots', 
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
              return requestAdminRole(user.id, 'frieren')
            })
            .then(() =>  User.findOne({ name: 'arnau' }).lean())
            .then(user => {
                expect(user).to.exist
                expect(user.role).to.equal('admin')
            })
    })

    it('fails on request admin role because user is already admin', () => {
        let catchedError

        return User.create({
            name: 'arnau',
            surname: 'romero',
            role: 'admin',
            email: 'ar@nau.com',
            username: 'arnausots', 
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return requestAdminRole(user.id, 'frieren')
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceof(ValidationError)
                expect(catchedError.message).to.equal('User is already admin')
            })
    })

    it('fails on non-existing user', () => {
        debugger
        let catchedError
        return requestAdminRole(new ObjectId().toString(), 'frieren')
        
        .catch(error => catchedError = error)
        .finally(() => {
            expect(catchedError).to.be.instanceof(NotFoundError)
            expect(catchedError.message).to.equal('User not found')
        })
    })

    it('fails on invalid secred word', () => {
        let catchedError

        return User.create({
            name: 'arnau',
            surname: 'romero',
            role: 'regular',
            email: 'ar@nau.com',
            username: 'arnausots', 
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(user => {
                return requestAdminRole(user.id, 'frieren1')
            })
            .catch(error => catchedError = error)
            .finally(() => {
                expect(catchedError).to.be.instanceof(CredentialsError)
                expect(catchedError.message).to.equal('Invalid secret word')
            }) 
    })

    afterEach(() => User.deleteMany({}))
    after(() => data.disconnect())
})