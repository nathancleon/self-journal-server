const express = require('express');
const journalController = require('./JournalPrompts.controller');
const {verifyToken} = require('../middleware');


let router = express.Router();

router.get('/all', verifyToken, journalController.fetchAllPrompts);

router.post('/submit', verifyToken, journalController.submitPrompts);


module.exports = router;