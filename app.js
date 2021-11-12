const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var connectToDB = require('./config/db_connection');
var router = require('./routes/route');

const app = express();
app.use(cors());

app.use(bodyParser.json());

connectToDB();


const PORT = process.env.PORT || 3000;

app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT,() => {
    console.log(`APP LISTENING ON PROD` );
});



