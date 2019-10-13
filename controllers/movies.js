const movieModel = require('../models/movie')

SearchMovie = (req, res, next) => {
    console.log(req.body)
    console.log(req.param.id)
    movieModel.findById(req.params.id, (err, movieInfo) => {

        if(err){
             next(err) 
            }
        else{
             res.json({status: "success", message: "Movie is found", movies: movieInfo})
            }
    })
}

GetAllMovies = (req, res, next) => {
    let movieList = []

    movieModel.find({}, (err, moviesInfo) => {
        if(err){
            next(err)
        }else{
            res.json({status: "success", message: "Movies found", movies: moviesInfo})
        }
    })
}

UpdateMovies = (req, res, next) => {
    console.log(req.params.id)
    console.log(req.body.name)
    movieModel.findByIdAndUpdate(req.params.id, {name: req.body.name}, (err, movieInfo) => {
        if(err){
            next(err)
        }else{
            res.json({status: "success", message: "Movie is updated", movies: movieInfo})
        }
    })
}

DeleteMovies = (req, res, next) => {
    movieModel.findByIdAndRemove(req.params.id, (err, movieInfo) => {
        if(err){
            next(err)
        }else{
            res.json({status: "success", message: "Movie is removed", movies: movieInfo})
        }
    })
}

AddMovie = (req, res, next) => {
    var Movie = {
        name: req.body.name,
        released_on: req.body.released_on
    }
    console.log(Movie)

    movieModel.create(Movie, (err, result) => {
        if(err){
            next(err)
        }else{
            res.json({status: "success", message: "Movie is added", movies: result})
        }
    })
}

module.exports = {
    AddMovie,
    DeleteMovies,
    UpdateMovies,
    GetAllMovies,
    SearchMovie
}