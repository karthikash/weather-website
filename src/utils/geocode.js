const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3BlbmhhbmNlZCIsImEiOiJjanVpM3l5MW0xNjVvNDRwOG9naWdicDJiIn0.y8Y6iyuPLdxJVy9z604uQg'

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location. Try again!.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;