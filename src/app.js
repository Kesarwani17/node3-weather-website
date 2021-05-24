const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express configs
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
        name: 'Gaurav Kesarwani'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        content: 'This is the help page. We will help you',
        name: 'Gaurav Kesarwani'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Gaurav Kesarwani'
    })
})

app.get('/Weather',(req,res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'No address?'
        })
    }
    geoCode(req.query.address,(error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Gaurav Kesarwani',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Gaurav Kesarwani',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})