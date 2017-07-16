import React from 'react'
import { connect } from 'react-redux'
import { getCurrentGame } from '../actions/searchActions'
import { getRankedLeague, getAccountId, getRecentRankedMatches, getRecentRankedMatchesDetails } from '../actions/currentGameActions'
import { getRealmVersion, getChampionImages } from '../actions/staticDataActions'

import CurrentGamePlayerList from './CurrentGamePlayerList'

class CurrentGamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receivedChampionImages: false,
      receivedRealmVersion: false,
      numberOfChampionsLoaded: 0,
      numberOfMatchesLoaded: 0
    }

    this.loadCurrentGameData()
  }

  loadCurrentGameData() {
    let searchParams = new URLSearchParams(this.props.location.search.substring(1));
    let name = searchParams.get('name');

    this.props.dispatch(getCurrentGame(this.props.match.params.region, name))
      .then(response => {
        if (response.status === 200) {
          this.props.dispatch(getChampionImages(this.props.match.params.region))
            .then(response => {
              if (response.status === 200) {
                this.setState({ receivedChampionImages: true })
              }
            }).catch(error => {
              console.log(error)
            })
          
          this.props.currentGame.gameInfo.participants.map(participant => {
            this.props.dispatch(getRankedLeague(this.props.match.params.region, participant.summonerId))
              .then(response => {
                
              }).catch(error => {
                console.log(error)
              })

            this.props.dispatch(getAccountId(this.props.match.params.region, participant.summonerId))
              .then(response => {
                this.props.dispatch(getRecentRankedMatches(this.props.match.params.region, response.data))
                  .then(response => {
                    response.data.map((match) => {
                      this.props.dispatch(getRecentRankedMatchesDetails(this.props.match.params.region, participant.summonerId, match.gameId))
                        .then(response => {
                          this.setState({ numberOfMatchesLoaded: this.state.numberOfMatchesLoaded + 1 })
                        }).catch(error => {
                          console.log(error)
                        })
                    })
                    this.setState({ numberOfChampionsLoaded: this.state.numberOfChampionsLoaded + 1 })
                  }).catch(error => {

                  })
              }).catch(error => {

              })
          })
        }
      }).catch(error => {
        console.log(error)
      })

    this.props.dispatch(getRealmVersion(this.props.match.params.region))
      .then(response => {
        if (response.status === 200) {
          this.setState({ receivedRealmVersion: true })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  doneFetchingData() {
    return this.state.receivedChampionImages && this.state.receivedRealmVersion && (this.state.numberOfChampionsLoaded === 10) && (this.state.numberOfMatchesLoaded === 50)
  }

  renderPlayerList() {
    if (this.doneFetchingData()) {
      return <CurrentGamePlayerList />
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className="container-fluid">
        Current Game Page
        {this.renderPlayerList()}
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    search: state.searchReducer,
    currentGame: state.currentGameReducer
  }
}

export default connect(mapStateToProps)(CurrentGamePage)