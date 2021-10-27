const express = require('express')
const router = express.Router();
const path = require('path')
const passport = require('passport')
const { ensureAuthenticated } = require('../config/auth')

const { RegisterUser } = require('../controllers/users');
const { room, bookingDate } = require('../controllers/booking');

router.route('/register')
.get((req,res) => res.render('register'))
.post(RegisterUser)

//Login Handle
router.route('/')
.get((req,res) => res.render('login'))
.post((req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/login/user',
        failureRedirect: '/login',
        failureFlash: true
    })  (req, res, next)
})

router.route('/user')
.get(ensureAuthenticated, (req, res) => {
    res.render('../views/index', {
        username: req.user.name,
        booking: req.user.booking[0]
    })
})
.post(room)

router.route('/user/bookings')
.get(ensureAuthenticated, (req, res) => {
    res.render('my-bookings', {
        name: req.user.booking[0].name,
        picture: req.user.booking[0].img,
        description: req.user.booking[0].description,
        price: req.user.booking[0].price,
        start_date: req.user.start_date,
        end_date: req.user.end_date
    })
})
.post(bookingDate)

//Logout Handle
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
}
)


module.exports = router
