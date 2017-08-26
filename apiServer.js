"use strict"

var express = require('express');
var axios = require('axios');
var encodeUrl = require('encodeurl')
var _ = require('lodash');
var regionalEndpoints = require('./src/constants/regionalEndpoints');
var app = express();
var Bottleneck = require('bottleneck');
var limiter = new Bottleneck(20, 60);
var mongoose = require('mongoose');

// Database Setup
mongoose.connect(`mongodb://${process.env.LOL_USERNAME}:${process.env.LOL_PASSWORD}@ds049651.mlab.com:49651/lolcamp`)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// Done with database setup

// Database Models
var Realms = require('./src/models/realms');
var ChampionImages = require('./src/models/championImages');
var ChampionData = require('./src/models/championData');
// Done with database models

var summonerNotFoundResponse = {
  message: 'Data not found - summoner not found',
  status_code: 404
}

var dataNotFoundResponse = {
  message: 'Data not found',
  status_code: 404
}

var rankedMatchesNotFoundResponse = {
  message: 'Not found',
  status_code: 404
}

function getSummonerId(req, res) {
  return axios.get(encodeUrl(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/summoner/v3/summoners/by-name/${req.query.summonerName}`), {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data.id)
    }).catch(error => {
      console.log(error)
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
        res.status(404).send({ error: 'GAME_NOT_FOUND' })
        return
      }
      res.status(error.response.data.status.status_code)
      console.log(error)
    })
}

app.get('/currentGame', (req, res) => {
  limiter.schedule(getCurrentGame, req, res)
})

app.get('/realmVersion', (req, res) => {
  Realms.find({}, function(err, realms) {
    if (err) {
      console.log(err)
      return err
    }

    if (realms.length === 0) {
      axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/static-data/v3/realms`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
        .then(response => {
          Realms.create({ data: response.data }, function(err, realm) {
            if (err) {
              return err
            }
          })
          res.json(response.data)
        }).catch(error => {
          console.log(error)
          res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_REALM_VERSION' })
        })
    } else {
      res.json(realms[0].data)
    }
  })
})

app.get('/championImages', (req, res) => {
  ChampionImages.find({}, function(err, championImages) {
    if (err) {
      console.log(err)
      return err
    }

    if (championImages.length === 0) {
      axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/static-data/v3/champions?locale=en_US&tags=image&dataById=true`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
        .then(response => {
          ChampionImages.create({ data: response.data }, function(err, championImage) {
            if (err) {
              return err
            }
          })
          res.json(response.data)
        }).catch(error => {
          console.log(error)
          res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_CHAMPION_IMAGES' })
        })
    } else {
      res.json(championImages[0].data)
    }
  })
})

app.get('/championData', (req, res) => {
  ChampionData.find({}, function(err, championData) {
    if (err) {
      console.log(err)
      return err
    }

    if (championData.length === 0) {
      axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/static-data/v3/champions?locale=en_US&dataById=false`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
        .then(response => {
          ChampionData.create({ data: response.data }, function(err, championData) {
            if (err) {
              return err
            }
          })
          res.json(response.data)
        }).catch(error => {
          console.log(error)
          res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_CHAMPION_DATA' })
        })
    } else {
      res.json(championData[0].data)
    }
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
        res.json([])
      }
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_RANKED_LEAGUE '})
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
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_ACCOUNT_ID' })
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
      if (_.isEqual(error.response.data.status, rankedMatchesNotFoundResponse)) {
          res.status(404).send({ error: 'NO_RECENT_RANKED_MATCHES' })
          return
      }
      
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_RECENT_RANKED_MATCHES' })
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
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_RECENT_RANKED_MATCHES_DETAILS' })
    })
}

app.get('/recentRankedMatchesDetails', (req, res) => {
  limiter.schedule(getRecentRankedMatchesDetails, req, res)
})

function getChampionMastery(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/champion-mastery/v3/champion-masteries/by-summoner/${req.query.summonerId}/by-champion/${req.query.championId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      res.json(response.data)
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_CHAMPION_MASTERY' })
    })
}

app.get('/championMastery', (req, res) => {
  limiter.schedule(getChampionMastery, req, res)
})

app.listen(3001, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('API server listening on port 3001')
})