const express = require('express')
const router = express.Router();
const path = require('path')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')

const { RegisterUser } = require('../controllers/users');


router.get('/loggedInPage', ensureAuthenticated, (req, res) => {
    res.render(path.resolve(__dirname, '..' + '/loggedInPage.ejs'))
})

router.route('/register')
.get((req,res) => res.render(path.resolve(__dirname, '..' + '/views/register.ejs')))
.post(RegisterUser)

//Login Handle
router.route('/login')
.get((req,res) => res.render(path.resolve(__dirname, '..' + '/views/login.ejs')))
.post((req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/loggedInPage',
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
