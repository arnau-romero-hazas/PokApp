//import { errors } from 'com';
import jwt from 'jsonwebtoken'
        
// Extraemos clases de error personalizadas desde el módulo de errores
//const { CredentialsError, DuplicityError, NotFoundError, OwnershipError, SystemError, ValidationError, AuthorizationError } = errors;
const { JsonWebTokenError } = jwt

        // Middleware para manejar errores
 export const errorHandler = (error, req, res, next) => {
    console.error(error)
    let status = 500
    let errorName = Error.name
    let { message} = error
    
    if (error instanceof Error) {
        status = 409;
        errorName = error.constructor.name;
    } else if (error instanceof Error) {
        status = 400;
        errorName = error.constructor.name;
    } else if (error instanceof Error) {
        status = 401;
        errorName = error.constructor.name;
    } else if (error instanceof Error) {
        status = 404;
        errorName = error.constructor.name;
    } else if (error instanceof Error) {
        status = 403;
        errorName = error.constructor.name;
    } else if (error instanceof Error) {
        status = 401
        errorName = JsonWebTokenError.name
        message = 'invalid JWT'
    }

    res.status(status).json({ error: errorName, message});
 }