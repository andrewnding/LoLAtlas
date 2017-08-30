"use strict"

var express = require('express');
var axios = require('axios');
var encodeUrl = require('encodeurl')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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
var Summoner = require('./src/models/summoner');
var RankedLeague = require('./src/models/rankedLeague');
var RecentRankedMatches = require('./src/models/recentRankedMatches');
var MatchDetails = require('./src/models/matchDetails');
var ChampionMastery = require('./src/models/championMastery');
// Done with database models

// User session setup
app.use(session({
  secret: process.env.LOL_SESSION_SECRET,
  resave: true,
  store: new MongoStore({ 
    mongooseConnection: db,
    ttl: 60 * 60 * 24 * 7
  })
}))
// Done with user session setup

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

function getSummonerByName(req, res) {
  return axios.get(encodeUrl(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/summoner/v3/summoners/by-name/${req.query.summonerName}`), {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      Summoner.create({ data: response.data }, function(err, summoner) {
        if (err) {
          console.log(err)
          return err
        }
        addSummonerToSearchHistory(req)
        res.json(response.data)
      })
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

app.get('/summonerByName', (req, res) => {
  req.session.summonerName = req.query.summonerName

  Summoner.find({ "data.name": req.query.summonerName }, function(err, summoner) {
    if (err) {
      console.log(err)
      return err
    }

    if (summoner.length === 0) {
      limiter.schedule(getSummonerByName, req, res)
    } else {
      addSummonerToSearchHistory(req)
      res.json(summoner[0].data)
    }
  })
})

function addSummonerToSearchHistory(req) {
  if (!req.session.searchHistory) {
    req.session.searchHistory = [req.query.summonerName]
    return
  }

  if (req.session.searchHistory.indexOf(req.query.summonerName) === -1) {
    req.session.searchHistory.push(req.query.summonerName)
    if (req.session.searchHistory.length > 5) {
      req.session.searchHistory.shift()
    }
  }
}

function getCurrentGame(req, res) {
  req.session.serviceRegion = req.query.serviceRegion

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
            res.json(response.data)
          })
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
            res.json(response.data)
          })
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
            res.json(response.data)
          })
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
        RankedLeague.create({ data: rankedSoloData[0] }, function(err, rankedLeague) {
          if (err) {
            return err
          }
        })
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
  RankedLeague.find({ "data.playerOrTeamId": req.query.summonerId }, function(err, rankedLeague) {
    if (err) {
      console.log(err)
      return err
    }

    if (rankedLeague.length === 0) {
      limiter.schedule(getRankedLeague, req, res)
    } else {
      res.json(rankedLeague[0].data)
    }
  })
})

function getSummonerByAccountId(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/summoner/v3/summoners/${req.query.summonerId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      Summoner.create({ data: response.data }, function(err, summoner) {
        if (err) {
          console.log(err)
          return err
        }
        res.json(response.data)
      })
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_ACCOUNT_ID' })
    })
}

app.get('/summonerByAccountId', (req, res) => {
  Summoner.find({ "data.id": Number(req.query.summonerId) }, function(err, summoner) {
    if (err) {
      console.log(err)
      return err
    }

    if (summoner.length === 0) {
      limiter.schedule(getSummonerByAccountId, req, res)
    } else {
      res.json(summoner[0].data)
    }
  })
  
})

function getRecentRankedMatches(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/match/v3/matchlists/by-account/${req.query.accountId}?queue=420&season=9`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      RecentRankedMatches.create({ accountId: Number(req.query.accountId), data: response.data.matches.slice(0, 5) }, function(err, matches) {
        if (err) {
          console.log(err)
          return err
        }
        res.json(response.data.matches.slice(0, 5))
      })
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
  RecentRankedMatches.find({ accountId: Number(req.query.accountId) }, function(err, matches) {
    if (err) {
      console.log(err)
      return err
    }

    if (matches.length === 0) {
      limiter.schedule(getRecentRankedMatches, req, res)
    } else {
      res.json(matches[0].data)
    }
  })
})

function getMatchDetails(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/match/v3/matches/${req.query.gameId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      MatchDetails.create({ data: response.data }, function(err, match) {
        if (err) {
          console.log(err)
          return err
        }
        res.json(response.data)
      })
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_MATCH_DETAILS' })
    })
}

app.get('/matchDetails', (req, res) => {
  MatchDetails.find({ 'data.gameId': Number(req.query.gameId) }, function(err, match) {
    if (err) {
      console.log(err)
      return err
    }

    if (match.length === 0) {
      limiter.schedule(getMatchDetails, req, res)
    } else {
      res.json(match[0].data)
    }
  })
})

function getChampionMastery(req, res) {
  return axios.get(`https://${regionalEndpoints.regions[req.query.serviceRegion]}/lol/champion-mastery/v3/champion-masteries/by-summoner/${req.query.summonerId}/by-champion/${req.query.championId}`, {headers: {"X-Riot-Token": process.env.RIOT_API_KEY}})
    .then(response => {
      ChampionMastery.create({ data: response.data }, function(err, championMastery) {
        if (err) {
          console.log(err)
          return err
        }
        res.json(response.data)
      })
    }).catch(error => {
      console.log(error)
      res.status(error.response.data.status.status_code).send({ error: 'ERROR_GETTING_CHAMPION_MASTERY' })
    })
}

app.get('/championMastery', (req, res) => {
  ChampionMastery.find({ "data.playerId": Number(req.query.summonerId), "data.championId": Number(req.query.championId) }, function(err, championMastery) {
    if (err) {
      console.log(err)
      return err
    }

    if (championMastery.length === 0) {
      limiter.schedule(getChampionMastery, req, res)
    } else {
      res.json(championMastery[0].data)
    }
  })
})

app.get('/searchHistory', (req, res) => {
  let searchObject = {}
  if (typeof req.session.serviceRegion !== undefined) {
    searchObject.serviceRegion = req.session.serviceRegion
  }

  if (typeof req.session.summonerName !== undefined) {
    searchObject.summonerName = req.session.summonerName
  }

  if (typeof req.session.searchHistory !== undefined) {
    searchObject.searchHistory = req.session.searchHistory
  }

  res.json(searchObject)
})

app.listen(3001, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('API server listening on port 3001')
})