const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');

// Render the Register page
router.get('/signup', loginController.signup);
router.get('/', loginController.login);
// router.get('/user', loginController.user);

// Register User
router.post('/signup', loginController.register);
router.post('/', loginController.signin);


module.exports = router;
