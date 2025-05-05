import jwt from'jsonwebtoken'

const { JWT_SECRET } = process.env

export const authHandler = (req, res, next) => {
    try{
        const { authorization } = req.headers
        const token = authorization.slice(7)
        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        req.userId = userId

        next()
    } catch(error){
        next(error)
    }
}