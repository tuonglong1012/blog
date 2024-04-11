const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.show); // http://localhost:3000/news/:slug
router.get('/', newsController.index); // http://localhost:3000/news

module.exports = router;
