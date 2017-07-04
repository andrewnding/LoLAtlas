"use strict"

var express = require('express');
var axios = require('axios');
var _ = require('lodash');
var regionalEndpoints = require('./src/constants/regionalEndpoints');
var app = express();

var summonerNotFoundResponse = {
  message: 'Data not found - summoner not found',
  status_code: 404
}

var dataNotFoundResponse = {
  message: 'Data not found',
  status_code: 404
}

app.get('/accountId', (req, res) => {
  axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/summoner/v3/summoners/by-name/${req.query.summonerName}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data.id)
    })
    .catch(error => {
      if (_.isEqual(error.response.data.status, summonerNotFoundResponse)) {
          res.status(404).send({ error: 'PLAYER_NOT_FOUND' })
          return
      }
      res.status(error.response.data.status.status_code)
      console.log(error)
    })
})

app.get('/currentGameInfo', (req, res) => {
  axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/spectator/v3/active-games/by-summoner/${req.query.summonerId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data)
    })
    .catch(error => {
      if (_.isEqual(error.response.data.status, dataNotFoundResponse)) {
        res.status(404).send({ error: 'DATA_NOT_FOUND' })
        return
      }
      res.status(error.response.data.status.status_code)
      console.log(error)
    })
})

app.listen(3001, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('API server listening on port 3001')
})