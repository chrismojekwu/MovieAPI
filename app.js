require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const movieData = require('./movies-data-small.json')

const app = express()

app.use(morgan('common'));
app.use(cors())
app.use(helmet())
app.use(validateToken = (req,res,next) => {
    const Token = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!Token || authToken.split(' ')[1] !== Token) {
        return res.status(401).json({ error: 'Unauthorized request' })
      }
    next()  
})

handleMovies = (req,res) => {
    let response = movieData

    const { genre, country, avg_vote} = req.query
    
    if(genre){
        response = movieData.filter(movies => {
            return movies.genre.toLowerCase().includes(genre.toLowerCase())
        })
    }
    
    if(country){
        response = movieData.filter(movies => {
            return movies.country.toLowerCase().includes(country.toLowerCase())
        })
    }

    if(avg_vote){
        response = movieData.filter(movies => {
            return movies.avg_vote >= avg_vote
        })
    }


    res.send(response)
}

app.get('/movie', handleMovies )

module.exports = app;