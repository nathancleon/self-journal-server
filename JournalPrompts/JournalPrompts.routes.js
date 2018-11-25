const express = require('express');
const journalController = require('./JournalPrompts.controller');
const {verifyToken} = require('../middleware');


let router = express.Router();

router.use(verifyToken);

router.get('/all', journalController.fetchAllPrompts);

router.post('/submit', journalController.submitPrompts);

router.put('/one/:id', journalController.updatePrompts)

module.exports = router;