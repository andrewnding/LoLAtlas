import React from 'react'
import { connect } from 'react-redux'
import { getCurrentGame } from '../actions/searchActions'
import { getRealmVersion, getChampionImages, getRankedLeague, getAccountId, getRecentRankedMatches } from '../actions/currentGameActions'
import sleep from '../utils/sleep'

import CurrentGamePlayerList from './CurrentGamePlayerList'

class CurrentGamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receivedChampionImages: false,
      receivedRealmVersion: false,
      numberOfChampionsLoaded: 0
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
            // Delay to avoid rate limiting
            sleep(100)
          
          this.props.currentGame.gameInfo.participants.map(participant => {
            this.props.dispatch(getRankedLeague(this.props.match.params.region, participant.summonerId))
              .then(response => {
                
              }).catch(error => {

              })
              // Delay to avoid rate limiting
              sleep(100)

            this.props.dispatch(getAccountId(this.props.match.params.region, participant.summonerId))
              .then(response => {
                this.props.dispatch(getRecentRankedMatches(this.props.match.params.region, response.data))
                  .then(response => {
                    this.setState({ numberOfChampionsLoaded: this.state.numberOfChampionsLoaded + 1 })
                  }).catch(error => {

                  })
              }).catch(error => {

              })
              // Delay to avoid rate limiting
              sleep(100)
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
    return this.state.receivedChampionImages && this.state.receivedRealmVersion && (this.state.numberOfChampionsLoaded === 10)
  }

  renderPlayerList() {
    if (this.doneFetchingData()) {
      return <CurrentGamePlayerList />
    } else {
      return <div></div>
    }
  }

  render() {
    console.log(this.props.currentGame.gameInfo.participants)
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