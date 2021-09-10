const User = require('../models/user')
const path = require('path')
const user = require('../models/user')

const RegisterUser = async (req, res) => {
    try {
        if(req.body.password !== req.body.confirm_password) {
            return res.status(400).send("Passwords didn't match")
        }
        const user = await User.create(req.body)
        res.status(201)
        res.sendFile(path.resolve(__dirname, '..' + '/loggedInPage.html'))
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
        res.sendFile(path.resolve(__dirname, '..' + '/loggedInPage.html'))
    } catch (error) {
        res.send(500).json({msg: error})
    }
}


module.exports = {
    RegisterUser,
    LoginUser,
}