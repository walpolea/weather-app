const req = require('request');

const showWeather = ({ lat, lon, placeName } = {}, callback) => {

  const exclusion = "exclude=[minutely,hourly,alerts,flags]";
  const url = `https://api.darksky.net/forecast/1e70121b0fd0858a58bed2d0523f2edd/${lat},${lon}?${exclusion}`;

  req.get(url, { json: true }, (err, res) => {

    if (err) {

      callback(err, undefined);

    } else if (res.body.error) {

      callback(res.body.error, undefined)

    } else {
      const data = res.body;

      callback(undefined, {
        location: placeName,
        forecast: `${data.daily.data[0].summary} It is currently ${data.currently.temperature} degrees. There is a ${data.currently.precipProbability}% chance of rain.`
      });
    }

  });

}

module.exports = showWeather;