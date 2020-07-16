const express = require('express');
const router = express.Router();
const accManController = require('../controller/accountManagementController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Today i learned', data: validation.validateCookie(req.cookies.userLogged)});
});

router.get('/login', accManController.login);

router.post('/login', accManController.handleLogin);

router.get('/loggout', accManController.loggout);

module.exports = router;
