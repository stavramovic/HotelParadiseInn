const User = require('../models/user')
const path = require('path')


const RegisterUser = async (req, res) => {
    try {
        if(req.body.password !== req.body.confirm_password) {
            return res.status(400).send("Passwords didn't match")
        }
        
        const {first_name:first_name} = req.body
        const name = await User.findOne({first_name:first_name})
        if(name) {
            return res.status(404).json({msg: `User already exists`})
        } else {
            const user = await User.create(req.body)
            res.status(201)
            res.sendFile(path.resolve(__dirname, '..' + '/registerPage.html'))
        }
        
    } catch (error) {
        res.send(500).json({msg: error})
    }
}
 
const LoginUser = async (req, res) => {
    try {
        const {email:email} = req.body
        const user = await User.findOne({email:email})
    if(!user) {
        return res.status(404).json({msg: `No user with email: ${email}`})
    }
    if(user.password !== req.body.password) {
        return res.status(404).json({msg: `Wrong password`})
    }
        res.sendFile(path.resolve(__dirname, '..' + '/loggedInPage.html'))
    } catch (error) {
        res.send(500).json({msg: error})
    }
}

module.exports = {
    RegisterUser,
    LoginUser,
}