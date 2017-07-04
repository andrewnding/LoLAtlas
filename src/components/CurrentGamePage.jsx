import React from 'react'
import { connect } from 'react-redux'
import { getCurrentGame } from '../actions/searchActions'
import { getRealmVersion, getChampionImages } from '../actions/currentGameActions'
// import * as actions from '../actions/searchActions'

import CurrentGamePlayerList from './CurrentGamePlayerList'

class CurrentGamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receivedCurrentGameData: false,
      receivedRealmVersion: false
    }

    this.loadCurrentGameData()
  }

  loadCurrentGameData() {
    let searchParams = new URLSearchParams(this.props.location.search.substring(1));
    let name = searchParams.get('name');

    this.props.dispatch(getCurrentGame(this.props.match.params.region, name))
      .then(response => {
        if (response.status === 200) {
          const championIds = response.data.participants.map(player => {
            return player.championId
          })
          this.props.dispatch(getChampionImages(this.props.match.params.region, championIds))
            .then(response => {
              if (response.status === 200) {
                this.setState({ receivedCurrentGameData: true })
              }
            }).catch(error => {
              console.log(error)
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
    return this.state.receivedCurrentGameData && this.state.receivedRealmVersion
  }

  renderPlayerList() {
    if (this.doneFetchingData()) {
      return <CurrentGamePlayerList />
    } else {
      <div></div>
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
    search: state.searchReducer
  }
}

export default connect(mapStateToProps)(CurrentGamePage)