const User = require('../models/user')
const path = require('path')
const bcrypt = require('bcrypt')

const RegisterUser = (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    let errors = [];

    if(!name || !email || !password || !confirm_password) {
        errors.push({msg: 'Please fill in all fields' });
    }

    if(password !== confirm_password) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        //Validation passed
        User.findOne({email:email})
            .then(user => {
                if(user) {
                    //User exists
                    errors.push({ msg: 'Email is already registered'})
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        confirm_password
                    })
                }   else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    })

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                     bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                        .then(user => {
                             req.flash('success_msg', 'You are now registered and can login')
                             res.redirect('/login')
                         })
                        .catch(err => console.log(err))
                    }))
                }
            })
    }
}

module.exports = {
    RegisterUser,
}