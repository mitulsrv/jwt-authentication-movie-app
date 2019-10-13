const express = require('express')
const logger = require('morgan')
const bodyparser = require('body-parser')
const users = require('./routes/usersRoute')
const movies = require('./routes/movieRoute')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')
const app = express()

mongoose.connect('mongodb://localhost:27017/jwt-api-movies', {useNewUrlParser: true, useFindAndModify: false    }, () => {
    console.log('Connected to MongoDB')
})
app.set('secretKey', 'mysecretkey')
app.use(logger('dev'))
app.use(bodyparser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.json({Message: "Server is okay"})
})

app.use('/users', users)
// app.use('/movies', movies)
app.use('/movies', ValidateUSer, movies)
function ValidateUSer(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decode) => {
        if(err){
            res.json({status: "error", message: err.message, data: null})
        }else{
            req.body.userId = decode.id;
            next()
        }
    })
}

//handle 404 
app.use((req, res, next) => {
    let err = new Error("not Found")
    err.status = 404,
    next(err)
})

//error handle middleware
app.use((err, req, res, next) => {
    console.log(err)
    if(err.status == 404){
        res.json({message: "Not Found"})
    }else{
        res.status(500).json({message: "Something went wrong"});
    }
})


app.listen(3000, ()=> {
    console.log('SERVER IS RUNNING ON PORT 3000')
})