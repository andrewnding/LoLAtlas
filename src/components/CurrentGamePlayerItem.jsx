import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import RankedMatchesList from './RankedMatchesList'

class CurrentGamePlayerItem extends React.Component {
  constructor(props) {
    super(props)

    let rankedData = this.props.player.rankedData
    if (rankedData) {
      if (rankedData.length === 0) {
        // Unranked
        this.tier = 'UNRANKED'
      } else {
        // Bronze through Challenger
        this.tier = rankedData.tier
      }
    }
  }

  rankedBadgeSrc() {
    let rankedData = this.props.player.rankedData
    let rank = rankedData.rank

    if (!this.tier) {
      // Error
      return ''
    }

    if (this.tier === 'UNRANKED') {
      return `/images/ranked-badges/base-icons/provisional.png`
    }

    if (['MASTER', 'CHALLENGER'].indexOf(this.tier) !== -1) {
      // Master and Challenger don't have ranks
      return `/images/ranked-badges/base-icons/${this.tier.toLowerCase()}.png`
    }

    // Bronze through Diamond
    return `/images/ranked-badges/tier-icons/${this.tier.toLowerCase()}_${rank.toLowerCase()}.png`
  }

  teamColor() {
    if (this.props.player.teamId === 100) {
      return 'blue-team-background'
    }

    if (this.props.player.teamId === 200) {
      return 'purple-team-background'
    }
  }

  renderRankInfo() {
    let rankedData = this.props.player.rankedData
    if (!rankedData) {
      return <span></span>
    }

    let tier = this.tier.charAt(0).toUpperCase() + this.tier.slice(1).toLowerCase()
    let rank = rankedData.rank
    let leaguePoints = rankedData.leaguePoints
    let miniSeries
    let miniSeriesIcons
    if (rankedData.miniSeries) {
      miniSeries = rankedData.miniSeries.progress.split('')
      miniSeriesIcons = miniSeries.map((series, i) => {
        if (series === 'W') {
          return <span key={i}><i className="fa fa-check series-icon color-green" aria-hidden="true"></i></span>
        } else if (series === 'L') {
          return <span key={i}><i className="fa fa-times series-icon color-red" aria-hidden="true"></i></span>
        } else {
          return <span key={i}><i className="fa fa-minus series-icon color-gray" aria-hidden="true"></i></span>
        }
      })
    } else {
      miniSeriesIcons = <span></span>
    }
    return (
      <div className='space-between vertical-align'>
        <img
          src={this.rankedBadgeSrc()}
          className="medium-icon"
        />
        <span>
          {tier} {rank}
        </span>
        <span>
          <div>
            {leaguePoints} LP
          </div>
          <div>
            {miniSeriesIcons}
          </div>
        </span>
      </div>
    )
  }

  renderWinPercent() {
    let rankedData = this.props.player.rankedData
    let winPercent = ((rankedData.wins / (rankedData.wins + rankedData.losses)) * 100).toFixed(0)
    if (winPercent > 53) {
      return <span className='color-green'>{winPercent}%</span>
    } else if (winPercent < 47) {
      return <span className='color-red'>{winPercent}%</span>
    } else {
      return <span>{winPercent}%</span>
    }
  }

  renderRecentRankedMatches() {
    if (!this.props.player.recentRankedMatches) {
      return
    }
    const recentRankedMatches = this.props.player.recentRankedMatches.map((match, i) => {
      return (
        <div key={i}>
          
          <span>{match.gameDetails.gameId}</span>
        </div>
      )
    })
    return recentRankedMatches
  }

  championImage() {
    return this.props.staticData.championImages[this.props.player.championId].image.full
  }

  render() {
    let rankedData = this.props.player.rankedData
    return (
      <div className='player-item-container'>
        <div className={`player-item-title ${this.teamColor()}`}>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${this.props.staticData.realmVersion}/img/champion/${this.championImage()}`}
            className="medium-icon"
          />
          <span>{this.props.player.summonerName}</span>
        </div>
        <div className='player-item-stats'>
          {this.renderRankInfo()}
        </div>
        <div>
          <span>
            Win / Loss: {rankedData.wins} / {rankedData.losses}
            <div>
              {this.renderWinPercent()}
            </div>
          </span>
        </div>
        <div>
          <span>Champion Mastery</span>
          <div>
            <div>Champion Level: {this.props.player.currentChampionMastery.championLevel}</div>
            <div>Champion Points: {this.props.player.currentChampionMastery.championPoints}</div>
            <div>Last Time Played: {moment(this.props.player.currentChampionMastery.lastPlayTime).fromNow()}</div>
          </div>
        </div>
        <div>
          <span>Recent Ranked Matches</span>
          <RankedMatchesList
            matches={this.props.player.recentRankedMatches}
            player={this.props.player}
          />
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

export default connect(mapStateToProps)(CurrentGamePlayerItem)