const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
CreateUser = (req, res, next) => {
    console.log(req.body)
    var User = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    console.log(User)
    UserModel.create(User, (err, result) => {
        if(err){
            next(err)
        }
        else{
            res.json({status: "success", message: "User is Registred", data:result})
        }
    })
}

Authenticate = (req, res, next) => {
    UserModel.findOne({email: req.body.email}, (err, UserInfo) => {
        if(err){
            next(err)
        }else{
            if(bcrypt.compareSync(req.body.password, UserInfo.password)){
                const token = jwt.sign({id: UserInfo._id}, req.app.get('secretKey'), {expiresIn: "1 h"})

                res.json({status: "success", message: "user found", data: { user: UserInfo, token: token }})
            }else{
                res.json({status: "failure", message: "Invalid email/password", data: null})
            }
        }
    })
}

module.exports = {
    CreateUser,
    Authenticate
}