const express = require('express');
const userController = require('../controllers/book');

const router = express.Router();

router.get('/', bookController.getBooksList);

module.exports = router;