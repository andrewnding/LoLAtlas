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
      <div className="col-md-5ths" key={i}>
        <CurrentGamePlayerItem player={player} />      
      </div>
    ))
  }

  renderTeam200() {
    let players = this.props.currentGame.gameInfo.participants.filter(player => (
      player.teamId === 200
    ))
    return players.map((player, i) => (
      <div className="col-md-5ths" key={i}>
        <CurrentGamePlayerItem player={player} />      
      </div>
    ))
  }

  render() {
    return (
      <div className='player-list-container container-fluid'>
        <div className='team-banner blue-team vertical-align'>
          Blue Team
        </div>
        <div className="row team-row">
          {this.renderTeam100()}
        </div>
        <div className='team-banner red-team vertical-align'>
          Red Team
        </div>
        <div className="row team-row">
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