const express = require('express')
const router = express.Router();

const {LoginUser, RegisterUser} = require('../controllers/users')


router.route('/users').post(RegisterUser)
router.route('/users/login').post(LoginUser)
module.exports = router
