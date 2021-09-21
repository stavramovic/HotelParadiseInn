const express = require('express')
const router = express.Router();
const path = require('path')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')

const { RegisterUser } = require('../controllers/users');


router.get('/login/user/', ensureAuthenticated, (req, res) => {
    res.render('loggedInPage')
    /* name: req.user.name */
})

router.route('/register')
.get((req,res) => res.render('register'))
.post(RegisterUser)

//Login Handle
router.route('/login')
.get((req,res) => res.render('login'))
.post((req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/login/user/',
        failureRedirect: '/login',
        failureFlash: true
    })  (req, res, next)
})

//Logout Handle
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
}
)


module.exports = router
