import 'dotenv/config'
import { data, User } from '../../data/index.js'
import { authenticateUser } from './authenticateUser.js'
import { expect } from 'chai'
import { errors } from '../../validations/index.js'

const { NotFoundError, CredentialsError } = errors

const { MONGO_URL, MONGO_DB } = process.env

describe('authenticateUser' , () => {
    before(() => data.connect(MONGO_URL, MONGO_DB))

    beforeEach(() => User.deleteMany({})) 

    // Test 1: Prueba que authenticateUser funciona correctamente cuando el usuario y la contraseña son validos.
    it('succeeds on existing user', () => { 
        let returnedUserId , returnedUserRole
        
        return User.create({ 
            name: 'Arnau',
            surname: 'Romero',
            email: 'arnau@romero.com',
            username: 'arnau',
            password: '$2b$10$UOFDt5V3swVqWGRlX3Jt4Or3ESx50L2TlBjROP6WUxX.2zpMLEl4O'
        })
            .then(() => authenticateUser('arnau', '123123123')) 
            .then(({id: userId , role }) => {
                returnedUserId = userId
                returnedUserRole = role
            })
        
            .finally(() =>{
                expect(returnedUserId).to.be.a.string
                expect(returnedUserRole).to.equal('regular')
            }) 
            .then(() => User.findOne({username: 'arnau'}).lean()) 
            .then(user => expect(user._id.toString()).to.equal(returnedUserId)) 
    })

    it('fails on non-existing user', () => { // TEST 2: Falla si el usuario no existe
        let catchedError 
        return authenticateUser('kakaroto', '123123123')
            .catch(error => catchedError = error) 
            .finally(() => {
    
                expect(catchedError).to.be.instanceOf(NotFoundError) 
                expect(catchedError.message).to.equal('user not found') 
            })
    })

    it('fails on existing user but wrong password', () => { // TEST 3: Falla si la contraseña es incorrecta
        let catchedError

        return User.create({ // Crear un usuario en la base de datos.
            name: 'Arnau',
            surname: 'Romero',
            email: 'arnau@romero.com',
            username: 'arnau_sots',
            password: '$2b$10$w3l4h/JAE0YYLyTGq8yBpu2ZNffKbQ5CWzhNiLg5AtTFAlCGaAkIO'
        })
            .then(() => authenticateUser('arnau_sots', '234234234')) // Intentamos autenticar una contraseña incorrecta (la correcta seria 123123123)
            .catch(error => catchedError = error) // Capturamos el error
            .finally(() => { 
                expect(catchedError).to.be.instanceOf(CredentialsError) // Verifica que sea una instancia de CredentialsError
                expect(catchedError.message).to.equal('Wrong credentials') // Verificamos que el mensaje sea 'wrong credentials
            })
    })
    afterEach(() => User.deleteMany({})) // Borramos los usarios después de cada test para que no haya interferencias entre tests.

    after(() => data.disconnect()) // Cerramos la conexion con la base de datos cuando terminen los tests.
})