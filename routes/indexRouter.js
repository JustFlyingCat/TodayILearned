const express = require('express');
const router = express.Router();
const validation = require('../controller/validation');
const accManController = require('../controller/accountManagementController');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await validation.validateCookie(req.cookies.userLogged);
  res.render('index', { title: 'Today i learned', data: data});
});

router.get('/login', accManController.login);

router.post('/login', accManController.handleLogin);

router.get('/loggout', accManController.loggout);

router.get('/createUser', accManController.createUser);

router.post('/createUser', accManController.createUserPost);

module.exports = router;
