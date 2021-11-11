const express = require('express');
const config = require('./config/config');
const connectDB = require('./config/db_connection');
var router = require('./routes/route');
var cors = require('cors');
var bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());

connectDB();

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
});



