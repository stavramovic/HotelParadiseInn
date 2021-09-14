const express = require('express')
const router = express.Router();
const path = require('path')

const {LoginUser, RegisterUser} = require('../controllers/users')
const loggedInPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '..' + '/loggedInPage.html'))
}

router.route('/users').post(RegisterUser)
router.route('/users/login').post(LoginUser).get(loggedInPage)
module.exports = router
