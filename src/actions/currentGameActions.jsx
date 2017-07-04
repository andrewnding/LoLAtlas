import axios from 'axios'

export const getCurrentGameInfo = (serviceRegion, summonerName) => {
  return (dispatch) => {
    return axios.get(`/api/accountId?serviceRegion=${serviceRegion}&summonerName=${summonerName}`)
      .then((response) => {
        return axios.get(`/api/currentGameInfo?serviceRegion=${serviceRegion}&summonerId=${response.data}`)
          .then((response) => {
            return response
          }).catch((err) => {
            if (err.response.data.error === "DATA_NOT_FOUND") {
              return err.response
              // Do data not found stuff here
            }
          })
      })
      .catch((err) => {
        if (err.response.data.error === "PLAYER_NOT_FOUND") {
          return err.response
          // Do player not found stuff here
        }
      })
  }
}