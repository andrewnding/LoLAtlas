import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import secondsToTime from '../utils/secondsToTime'

class RankedMatchesItem extends React.Component {
  constructor(props) {
    super(props)

    if (this.winOrLose(this.props.match.gameDetails.teams) === 'Victory') {
      this.win = true
    } else {
      this.win = false
    }
  }

  winOrLose(teams) {
    const playerTeamData = teams.filter(team => {
      return team.teamId === this.props.playerData.teamId
    })
    if (playerTeamData[0].win === 'Win') {
      return 'Victory'
    }
    return 'Defeat'
  }

  render() {
    const myClassNames = classNames({
      'ranked-match-item': true,
      'victory-background': this.win,
      'defeat-background': !this.win
    })
    return (
      <div className={myClassNames}>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/${this.props.currentGame.realmVersion}/img/champion/${this.props.playerData.championImage}`}
          className="medium-icon"
        />
        <span>{this.win ? 'Victory' : 'Defeat'}</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGame: state.currentGameReducer
  }
}

export default connect(mapStateToProps)(RankedMatchesItem)