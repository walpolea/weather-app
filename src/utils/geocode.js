const req = require('request');

const geocode = (address, callback) => {

  const key = "pk.eyJ1Ijoid2FscG9sZWEiLCJhIjoiY2o4bzlzdGY4MDExczJ3cWMxMXJpZ21sNyJ9.o_UbW0lvDbmZGN2Vmkhw0Q";
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${key}`;

  req.get(endpoint, { json: true }, (err, res) => {

    if (err) {

      callback(err, undefined);

    } else if (!res.body.features.length) {

      callback("ERROR: Location not found!", undefined);

    } else {
      callback(undefined, {
        placeName: res.body.features[0].place_name,
        lat: res.body.features[0].geometry.coordinates[1],
        lon: res.body.features[0].geometry.coordinates[0]
      });
    }
  })
}

module.exports = geocode;