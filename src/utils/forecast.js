const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e61d6555592cddc58bb4b3b2104c9d95&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +'&units=m'
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            //console.log(body.current)
            callback (undefined, {
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike,
                location: body.location.region,
                cloud_cover: body.current.cloudcover,
                humidity: body.current.humidity,
                precip: body.current.precip,
                weatherImg: body.current.weather_icons[0]
            })
        }
    })
}

module.exports=forecast;