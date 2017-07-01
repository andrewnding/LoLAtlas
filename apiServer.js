"use strict"

var express = require('express');
var axios = require('axios');

var app = express();

app.get('/test', (req, res) => {
  axios.get(`https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/RiotSchmick?api_key=${process.env.RIOT_API_KEY}`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
})

app.listen(3001, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('API server listening on port 3001')
})