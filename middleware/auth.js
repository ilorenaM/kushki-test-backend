const response = require('../network/response');
const { verifyToken } = require('../utils/generateToken');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['token'];
    try {
        verify = verifyToken(apiKey)
        next();
    } catch (error) {
        console.log(error);
        next(response.error(req, res, "Unauthorized", 401, "Invalid token"))
    }
}

module.exports = { checkApiKey }