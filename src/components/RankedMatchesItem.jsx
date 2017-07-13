import React from 'react'

export default class RankedMatchesItem extends React.Component {
  constructor(props) {
    super(props)
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
    return (
      <div>
        <span>{this.winOrLose(this.props.match.gameDetails.teams)}</span>
      </div>
    )
  }
}