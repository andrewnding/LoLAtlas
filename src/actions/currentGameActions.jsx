import axios from 'axios'

export const getCurrentGameInfo = (serviceRegion, summonerName) => {
  return (dispatch) => {
    axios.get(`/api/accountId?serviceRegion=${serviceRegion}&summonerName=${summonerName}`)
      .then((response) => {
        return axios.get(`/api/currentGameInfo?serviceRegion=${serviceRegion}&summonerId=${response.data}`)
          .then((response) => {
            debugger
            console.log(response.data)
          }).catch((err) => {
            if (err.response.data.error === "DATA_NOT_FOUND") {
              console.log(err.response.data.error)
              // Do data not found stuff here
            }
          })
      })
      .catch((err) => {
        if (err.response.data.error === "PLAYER_NOT_FOUND") {
          console.log(err.response.data.error)
          // Do player not found stuff here
        }
      })
  }
}