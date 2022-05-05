
const subscriptions = require('../components/subscriptions/network');
const transactions = require('../components/transactions/network');


const routes = (server) => {
    server.use('/api/subscription/', subscriptions);
    server.use('/api/transaction/', transactions);
}

module.exports = routes