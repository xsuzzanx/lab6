const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/set', userController.getSetUserSession);
router.post('/set', userController.getSetUserSession);

module.exports = router;
