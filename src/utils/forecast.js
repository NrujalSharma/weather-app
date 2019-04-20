const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/8c254014070043ca5689cc1beae8446b/' + latitude + ',' + longitude + '?units=si';

  request({url, json:true}, (error, {body}) => {
    if(error){
      callback('Unable to connect', undefined);
    }
    else if(body.error){
      callback('Unable to find the place', undefined);
    }
    else{
      callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain');
    }
  })
}

module.exports = forecast
