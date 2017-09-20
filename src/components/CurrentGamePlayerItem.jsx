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

  renderChampionMasteryBadge() {
    if (this.props.player.currentChampionMastery.championLevel === 0) {
      return <span className="medium-icon"></span>
    }
    return(
      <img
        src={this.currentChampionMasterySrc()}
        className="medium-icon"
      />
    )
  }

  renderChampionMastery() {
    let lastPlayed;
    if (this.props.player.currentChampionMastery.championLevel > 0) {
      lastPlayed = moment(this.props.player.currentChampionMastery.lastPlayTime).fromNow()
    } else {
      lastPlayed = 'First Time'
    }
    
    return (
      <div>
        <div className='player-item-sub-title'>Champion Mastery</div>
        <div className='player-item-content'>
          <div className='space-between vertical-align'>
            {this.renderChampionMasteryBadge()}
            <span className='text-align-center'>
              <div>
                Level
              </div>
              <div>
                {this.props.player.currentChampionMastery.championLevel}  
              </div>
            </span>
            <span className='text-align-center'>
              <div>
                Points
              </div>
              <div>
                {this.props.player.currentChampionMastery.championPoints}
              </div>
            </span>
          </div>
          <div>{this.props.staticData.championData[this.props.player.championId.toString()].name} Played: {lastPlayed}</div>
        </div>
      </div>
    )
  }

  currentChampionMasterySrc() {
    if (false) {
      // Handle 404 (level 0)
    }
    return `/images/champion-mastery/level_${this.props.player.currentChampionMastery.championLevel}.png`
  }

  summonerSpell1() {
    const summonerSpellOne = this.props.staticData.summonerSpells[this.props.player.spell1Id.toString()]
    return summonerSpellOne.image.full
  }

  summonerSpell2() {
    const summonerSpellTwo = this.props.staticData.summonerSpells[this.props.player.spell2Id.toString()]
    return summonerSpellTwo.image.full
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
          <span className='title-left-padding'>
            {this.props.player.summonerName}
          </span>
        </div>
        <div className='player-item-stats'>
          <div className='player-item-sub-title'>
            Ranked Data
          </div>
          <div className='player-item-content'>
            {this.renderRankInfo()}
            <div className="space-between">
              <span>
                Win / Loss: {rankedData.wins} / {rankedData.losses}
              </span>
              <span>
                {this.renderWinPercent()}
              </span>
            </div>
          </div>
        </div>
        <div>
          {this.renderChampionMastery()}
        </div>
        <div>
          <div className='player-item-sub-title'>Recent Ranked Matches</div>
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