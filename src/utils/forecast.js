const request = require("request")
const forecast = (latitude, longitude, callback) => {
    //const url = "http://api.positionstack.com/v1/reverse?access_key=0b5f77fac7e1139e92bbad1f60045793&query=" + latitude + ',' + longitude 22.7196,75.8577
    const url = "http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=" + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        //const results = response.body.data[0];
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback("Unable to find loaction.", undefined);
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out." + body.current.precip + "% chance of rain."
                //{
                // Summary: results.summary,
                // Temperature: results.temperature,
                // Latitude: results.latitude,
                // Longitude: results.longitude,
                // City: results.name
                //}
            )
        }
    })
}

module.exports = forecast



