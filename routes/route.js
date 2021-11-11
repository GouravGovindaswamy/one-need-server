const express = require('express');
const router = express.Router();
var quitter = require('./quitter/quitter-router');

router.use(quitter);


module.exports = router;
