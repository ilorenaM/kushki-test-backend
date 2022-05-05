const express = require('express');
const bodyParser = require('body-parser');
const router = require('./network/routes');
const {config} = require('./config/config');
const cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
      callback(null, true);
    /* if (whitelist.includes(origin) || !origin) {
    } else {
      callback(new Error('no permitido'));
    } */
  }
}
app.use(cors(options));

router(app);

app.listen(config.port);