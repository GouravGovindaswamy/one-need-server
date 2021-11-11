const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();

var quitter = require('../quitter/index');

route.get('/_quitter/getYesterdayCount', quitter.getYesterdayCount);
route.get('/_quitter/getTodayCount', quitter.getTodayCount);
route.post('/_quitter/samplePost', quitter.samplePost);
route.post('/_quitter/postTodayCount', quitter.postTodayCount);


module.exports = route;

