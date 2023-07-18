require('dotenv').config()

const express = require('express');
const router = require('./routes.js');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use('/', router);

const port = 4000
app.set('port', port);

app.listen(port, function () {
    console.log('Server is running.. on ' + port);
});

