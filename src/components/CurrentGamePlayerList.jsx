import React from 'react'
import { connect } from 'react-redux'
import CurrentGamePlayerItem from './CurrentGamePlayerItem'

class CurrentGamePlayerList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderTeam100() {
    let players = this.props.currentGame.gameInfo.participants.filter(player => (
      player.teamId === 100
    ))
    return players.map((player, i) => (
      <div className="col-md-2" key={i}>
        <CurrentGamePlayerItem playerData={player} />      
      </div>
    ))
  }

  renderTeam200() {
    let players = this.props.currentGame.gameInfo.participants.filter(player => (
      player.teamId === 200
    ))
    return players.map((player, i) => (
      <div className="col-md-2" key={i}>
        <CurrentGamePlayerItem playerData={player} />      
      </div>
    ))
  }

  render() {
    return (
      <div>
        Player List
        <div className="row">
          {this.renderTeam100()}
        </div>
        <div className="row">
          {this.renderTeam200()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGame: state.currentGameReducer
  }
}

export default connect(mapStateToProps)(CurrentGamePlayerList)