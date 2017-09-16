import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import classNames from 'classnames'
import secondsToTime from '../utils/secondsToTime'

class RankedMatchesItem extends React.Component {
  constructor(props) {
    super(props)

    try {
      this.error = false
      this.participantId = this.getParticipantId()
      this.teamId = this.getTeamId()
      this.result = this.winOrLose()
    } catch (e) {
      console.log(e)
      this.error = true
    }
  }

  getParticipantId() {
    const currentParticipantIdentity = this.props.match.gameDetails.participantIdentities.filter(identity => {
      return identity.player.summonerName === this.props.player.summonerName
    })
    return currentParticipantIdentity && currentParticipantIdentity ? currentParticipantIdentity[0].participantId : null
  }

  getTeamId() {
    const currentParticipant = this.props.match.gameDetails.participants.filter(participant => {
      return participant.participantId === this.participantId
    })
    return currentParticipant ? currentParticipant[0].teamId : null
  }

  winOrLose() {
    if (this.props.match.gameDetails.gameDuration < 300) {
      return 'Remake'
    }

    const playerTeamData = this.props.match.gameDetails.teams.filter(team => {
      return team.teamId === this.teamId
    })

    if (playerTeamData[0].win === 'Win') {
      return 'Victory'
    }
    return 'Defeat'
  }

  championImage() {
    return this.props.staticData.championImages[this.props.match.champion].image.full
  }

  renderGameEndTime() {
    return (
      <span>
        {moment(this.props.match.gameDetails.gameCreation).fromNow()}
      </span>
    )
  }

  renderGameDuration() {
    const duration = secondsToTime(this.props.match.gameDetails.gameDuration)

    if (duration.hours > 0) {
      return (
        <span>
          {[
            <span key={0}>{duration.hours}h </span>,
            <span key={1}>{duration.minutes}m </span>,
            <span key={2}>{duration.seconds}s</span>
          ]}
        </span>
      )
    }
    return (
        <span>
          {[
            <span key={1}>{duration.minutes}m </span>,
            <span key={2}>{duration.seconds}s</span>
          ]}
        </span>
      )
  }

  renderKda() {
    const currentParticipant = this.props.match.gameDetails.participants.filter(participant => {
      return participant.participantId === this.participantId
    })

    if (currentParticipant.length === 0) {
      return <span></span>
    }

    const participantStats = currentParticipant[0].stats
    let kda
    let kdaString

    if (participantStats.deaths === 0) {
      kdaString = 'Perfect'
    } else {
      kda = ((participantStats.kills + participantStats.assists) / participantStats.deaths).toFixed(2)
      kdaString = `${kda} : 1`
    }

    const kdaClassNames = classNames({
      'gold-text': kdaString === 'Perfect' || kda >= 5,
      'red-text': kda < 1.5,
      'title-left-padding': true
    })

    return (
      <span>
        <span className='title-left-padding'>{participantStats.kills}/{participantStats.deaths}/{participantStats.assists}</span>
        <span className={kdaClassNames}>{kdaString}</span>
      </span>
    )
  }

  summonerSpell1() {
    const currentParticipant = this.props.match.gameDetails.participants.filter(participant => {
      return participant.participantId === this.participantId
    })

    const summonerSpellOne = this.props.staticData.summonerSpells[currentParticipant[0].spell1Id.toString()]
    return summonerSpellOne.image.full
  }

  summonerSpell2() {
    const currentParticipant = this.props.match.gameDetails.participants.filter(participant => {
      return participant.participantId === this.participantId
    })

    const summonerSpellTwo = this.props.staticData.summonerSpells[currentParticipant[0].spell2Id.toString()]
    return summonerSpellTwo.image.full
  }

  render() {
    if (this.error) {
      return (
        <div>
          ERROR
        </div>
      )
    }

    const myClassNames = classNames({
      'victory-background': this.result === 'Victory',
      'defeat-background': this.result === 'Defeat',
      'remake-background': this.result === 'Remake'
    })

    return (
      <div className={myClassNames}>
        <div className="space-between item-header-text">
          <span>{this.result}</span>
          {this.renderGameEndTime()}
          {this.renderGameDuration()}
        </div>
        <div>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${this.props.staticData.realmVersion}/img/champion/${this.championImage()}`}
            className="medium-icon circular-icon"
          />
          <span className="summoner-spell-container">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/${this.props.staticData.realmVersion}/img/spell/${this.summonerSpell1()}`}
              className="summoner-icon-1"
            />
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/${this.props.staticData.realmVersion}/img/spell/${this.summonerSpell2()}`}
              className="summoner-icon-2"
            />
          </span>
          {this.renderKda()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentGame: state.currentGameReducer,
    staticData: state.staticDataReducer
  }
}

export default connect(mapStateToProps)(RankedMatchesItem)