const request = require('request');

const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibnJ1amFsLXNoYXJtYSIsImEiOiJjanU0NXNsZnEwcnpqNDFvNWZrMnk4ZmI0In0.5pcxAutObwo0cdkqT1H5eA';

  request({url, json:true}, (error, {body}) => {
    if(error){
      callback('Unable to connect to the location service :(', undefined)
    }
    else if(body.features.length === 0){
      callback('Cannot find place :(', undefined);
    }
    else{
      callback(undefined, {
            location: body.features[0].place_name,
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1]
      });
    }
  })
}


module.exports = geoCode;
