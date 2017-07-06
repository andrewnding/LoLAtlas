import React from 'react'
import { connect } from 'react-redux'
import { getCurrentGame } from '../actions/searchActions'
import { getRealmVersion, getChampionImages, getRankedLeague } from '../actions/currentGameActions'

import CurrentGamePlayerList from './CurrentGamePlayerList'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  /// Used to delay api calls
  delay() {
    var i = 0;
    this.myLoop(this.props, i)
  }

  myLoop(props, i) {
    setTimeout(this.innerLoop.bind(this, props, i), 100)
  }

  innerLoop(props, i) {
      props.dispatch(getRankedLeague(props.match.params.region, props.currentGame.gameInfo.participants[i].summonerId))
        .then(response => {
            this.setState({ numberOfChampionsLoaded: this.state.numberOfChampionsLoaded + 1 })
          }).catch(error => {

          })
      i++;
      if (i < 10) {
        this.myLoop(props, i);
      }
    }
  /// End used to delay api calls


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

            // Temporary to delay api calls
            this.delay()
          
          // This is the actual code that will be uncommented
          // this.props.currentGame.gameInfo.participants.map(participant => {
          //   this.props.dispatch(getRankedLeague(this.props.match.params.region, participant.summonerId))
          //     .then(response => {
          //       this.setState({ numberOfChampionsLoaded: this.state.numberOfChampionsLoaded + 1 })
          //     }).catch(error => {

          //     })
          // })
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