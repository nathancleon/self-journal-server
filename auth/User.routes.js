const express = require('express');
const userController = require('./User.controller');
let router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.registerUser);

module.exports = router;