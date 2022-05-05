require('dotenv').config();
const axios = require('axios').default

const config = {
    port: process.env.PORT || 3000,
    secret: process.env.JWTSECRET,
    privateKey: process.env.PRIVATE_KEY,
    merchanId: process.env.MERCHANT_ID
}; 

const KushkiInstance = axios.create({
    baseURL: 'https://api-uat.kushkipagos.com',
    headers: {
        'Content-Type': 'application/json',
        'Private-Merchant-Id': config.privateKey
        }
  });

module.exports = {config, KushkiInstance};