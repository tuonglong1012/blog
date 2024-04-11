// Viết những index liên quan tới site
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/home', siteController.home);

module.exports = router;
