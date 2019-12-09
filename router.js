var express = require('express');
var router = express.Router();

var userController = require('./routes/users');
// var loginController = require('./routes/login');


router.get('/get', userController.users_list);
router.post('/save', userController.saveUsers);
// router.post('/login/post', loginController);

module.exports = router;