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
      this.result = this.winOrLose()
    } catch (e) {
      console.log(e)
      this.error = true
    }
  }

  winOrLose() {
    if (this.props.match.gameDetails.gameDuration < 300) {
      return 'Remake'
    }

    if (this.props.match.gameDetails.participant.stats.win) {
      return 'Victory'
    }
    return 'Defeat'
  }

  championImage() {
    return this.props.staticData.championImages[this.props.match.champion].image.full
  }

  // Time since the game ended
  renderGameEndTime() {
    return (
      <span>
        {moment(this.props.match.gameDetails.gameCreation + this.props.match.gameDetails.gameDuration * 1000).fromNow()}
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
    const currentParticipant = this.props.match.gameDetails.participant
    const participantStats = currentParticipant.stats
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
      'red-text': kda < 1,
      'title-left-padding': true
    })

    return (
      <span>
        <span className='title-left-padding'>{participantStats.kills}/{participantStats.deaths}/{participantStats.assists}</span>
        <span className={kdaClassNames}>{this.result === 'Remake' ? '' : kdaString }</span>
      </span>
    )
  }

  summonerSpell1() {
    const currentParticipant = this.props.match.gameDetails.participant

    const summonerSpellOne = this.props.staticData.summonerSpells[currentParticipant.spell1Id.toString()]
    return summonerSpellOne.image.full
  }

  summonerSpell2() {
    const currentParticipant = this.props.match.gameDetails.participant

    const summonerSpellTwo = this.props.staticData.summonerSpells[currentParticipant.spell2Id.toString()]
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