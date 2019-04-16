const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Karthik Ashokkumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Karthik Ashokkumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Karthik Ashokkumar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: 'You must provide a address!'
        })
    }
    geocode(req.query.address, (err, {
        latitude,
        longtitude,
        location
    } = {}) => {
        if (err) return res.send({ err })
        forecast(latitude, longtitude, (err, forecastData) => {
            if (err) return res.send({ err })
            res.send({
                weather: forecastData,
                location
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Karthik Ashokkumar',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Karthik Ashokkumar',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ', port)
})