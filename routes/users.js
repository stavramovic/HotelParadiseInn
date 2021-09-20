const express = require('express')
const router = express.Router();
const path = require('path')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')

const { RegisterUser } = require('../controllers/users');


router.get('/login/user/:id', ensureAuthenticated, (req, res) => {
    res.render('loggedInPage')
})

router.route('/register')
.get((req,res) => res.render('register'))
.post(RegisterUser)

//Login Handle
router.route('/login')
.get((req,res) => res.render('login'))
.post((req, res, next) => {
    passport.authenticate('local', {failureFlash: true}, function(err, user, info) {
        if(err) { return next(err) }
        if(!user) { return res.redirect('/login') }
        req.logIn(user, function(err) {
            if(err) { return next(err) }
        return res.redirect('/login/user/' + req.user.id)
        })
    })(req, res, next)
})

//Logout Handle
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
}
)


module.exports = router
