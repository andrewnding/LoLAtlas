"use strict"

var express = require('express');
var axios = require('axios');
var _ = require('lodash');
var regionalEndpoints = require('./src/constants/regionalEndpoints');
var app = express();
var Bottleneck = require('bottleneck');
var limiter = new Bottleneck(10, 100);

var summonerNotFoundResponse = {
  message: 'Data not found - summoner not found',
  status_code: 404
}

var dataNotFoundResponse = {
  message: 'Data not found',
  status_code: 404
}

function getSummonerId(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/summoner/v3/summoners/by-name/${req.query.summonerName}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data.id)
    }).catch(error => {
      if (_.isEqual(error.response.data.status, summonerNotFoundResponse)) {
          res.status(404).send({ error: 'PLAYER_NOT_FOUND' })
          return
      }
      res.status(error.response.data.status.status_code)
      console.log(error)
    })
}

app.get('/summonerId', (req, res) => {
  limiter.schedule(getSummonerId, req, res)
})

function getCurrentGame(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/spectator/v3/active-games/by-summoner/${req.query.summonerId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data)
    }).catch(error => {
      if (_.isEqual(error.response.data.status, dataNotFoundResponse)) {
        res.status(404).send({ error: 'DATA_NOT_FOUND' })
        return
      }
      res.status(error.response.data.status.status_code)
      console.log(error)
    })
}

app.get('/currentGame', (req, res) => {
  limiter.schedule(getCurrentGame, req, res)
})

function getRealmVersion(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/static-data/v3/realms`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data)
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'INVALID_REGIONAL_ENDPOINT' })
    })
}

app.get('/realmVersion', (req, res) => {
  limiter.schedule(getRealmVersion, req, res)
})

app.get('/championImages', (req, res) => {
  axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/static-data/v3/champions?locale=en_US&tags=image&dataById=true`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data)
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'CHAMPION_NOT_FOUND' })
    })
})

function getRankedLeague(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/league/v3/positions/by-summoner/${req.query.summonerId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      var rankedSoloData = response.data.filter(data => {
        return data.queueType === 'RANKED_SOLO_5x5'
      })
      if (rankedSoloData.length !== 0) {
        res.json(rankedSoloData[0])
      } else {
        res.status(404).send({ error: 'NO_RANKED_SOLO_5x5' })
      }
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'PLAYER_NOT_FOUND '})
    })
}

app.get('/rankedLeague', (req, res) => {
  limiter.schedule(getRankedLeague, req, res)
})

function getAccountId(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/summoner/v3/summoners/${req.query.summonerId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data.accountId)
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'ACCOUNT_NOT_FOUND' })
    })
}

app.get('/accountId', (req, res) => {
  limiter.schedule(getAccountId, req, res)
})

function getRecentRankedMatches(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/match/v3/matchlists/by-account/${req.query.accountId}?queue=420&season=9`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data.matches.slice(0, 5))
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'MATCHES_NOT_FOUND' })
    })
}

app.get('/recentRankedMatches', (req, res) => {
  limiter.schedule(getRecentRankedMatches, req, res)
})

function getRecentRankedMatchesDetails(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/match/v3/matches/${req.query.gameId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data)
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'MATCH_NOT_FOUND' })
    })
}

app.get('/recentRankedMatchesDetails', (req, res) => {
  limiter.schedule(getRecentRankedMatchesDetails, req, res)
})

app.listen(3001, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('API server listening on port 3001')
})