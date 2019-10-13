const express = require('express')
const Router = express.Router()
const movieController = require('../controllers/movies')



Router.get('/', movieController.GetAllMovies)
Router.get('/:id', movieController.SearchMovie)
Router.post('/', movieController.AddMovie)
Router.delete('/:id', movieController.DeleteMovies)
Router.put('/:id', movieController.UpdateMovies)


module.exports = Router