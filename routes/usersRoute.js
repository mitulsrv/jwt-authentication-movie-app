const express = require('express')
const bodyparser = require('body-parser')
const UserController = require('../controllers/users')
const UserRoute = express.Router()

UserRoute.post('/register', UserController.CreateUser)
UserRoute.post('/authenticate', UserController.Authenticate)


module.exports = UserRoute
