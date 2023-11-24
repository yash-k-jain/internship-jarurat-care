const jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) => {
    const authToken = req.header('auth-token');
    // checking exsistence of authToken
    if(!authToken){
        res.status(401).json({error: "Please authenticate with a valid token."})
    }
    try {
        // Verifying jwt token
        const data = jwt.verify(authToken, "itisasecretkey")
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).json({error: "Please authenticate with a valid token."})
    }
}

module.exports = fetchUser;