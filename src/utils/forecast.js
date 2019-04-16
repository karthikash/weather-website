const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/abbf87f98928434dde339d91f9ecee2a/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude)

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location. Try again!', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.currently.temperature + ' degress out there. ' + body.daily.data[0].summary + ' There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast;