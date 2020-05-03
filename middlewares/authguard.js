// Middleware for checking Bearer token in Authorization Header and
// populating request with extracted data from token.



const jwt = require('jsonwebtoken')
const jwtKey = require('../utils/keys')['jwt_key']
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = await jwt.verify(token, jwtKey)
        req.userData = {email: decodedToken.email, userId: decodedToken.userId}
        next()
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }


}
