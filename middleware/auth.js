const response = require('../network/response');
const { verifyToken } = require('../utils/generateToken');

function checkApiKey(req, res, next) {
    const token = req.headers['token'];
    console.log(token);
    try {
        if(!!token){
            next();
        } else {
            next(response.error(req, res, "Unauthorized", 401, "Token required"))
        }
    } catch (error) {
        console.log(error);
        next(response.error(req, res, "Unauthorized", 401, "Token required"))
    }
}

module.exports = { checkApiKey }