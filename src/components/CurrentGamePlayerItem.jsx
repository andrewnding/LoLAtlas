import React from 'react'
import { connect } from 'react-redux'

class CurrentGamePlayerItem extends React.Component {
  constructor(props) {
    super(props)

    let rankedData = this.props.playerData.rankedData
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
    let rankedData = this.props.playerData.rankedData
    let rank = rankedData.entries[0].rank

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
    if (this.props.playerData.teamId === 100) {
      return 'blue-team-background'
    }

    if (this.props.playerData.teamId === 200) {
      return 'purple-team-background'
    }
  }

  renderLeagueInfo() {
    let rankedData = this.props.playerData.rankedData
    if (!rankedData) {
      return <span></span>
    }

    let tier = this.tier.charAt(0).toUpperCase() + this.tier.slice(1).toLowerCase()
    let rank = rankedData.entries[0].rank
    let leaguePoints = rankedData.entries[0].leaguePoints
    let miniSeries
    let miniSeriesIcons
    if (rankedData.entries[0].miniSeries) {
      miniSeries = rankedData.entries[0].miniSeries.progress.split('')
      miniSeriesIcons = miniSeries.map((series, i) => {
        if (series === 'W') {
          return <span key={i}><i className="fa fa-check series-icon" aria-hidden="true"></i></span>
        } else if (series === 'L') {
          return <span key={i}><i className="fa fa-times series-icon" aria-hidden="true"></i></span>
        } else {
          return <span key={i}><i className="fa fa-minus series-icon" aria-hidden="true"></i></span>
        }
      })
    } else {
      miniSeriesIcons = <span></span>
    }
    return (
      <div>
        <img
          src={this.rankedBadgeSrc()}
          className="medium-icon"
        />
        <span className='tier-data'>
          <span>{tier} {rank}</span>
          <span className='float-right'>
            <div>
              {leaguePoints} LP
            </div>
            <div>
              {miniSeriesIcons}
            </div>
          </span>
        </span>
      </div>
    )
  }

  render() {
    return (
      <div className='player-item-container'>
        <div className={`player-item-title ${this.teamColor()}`}>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${this.props.currentGame.realmVersion}/img/champion/${this.props.playerData.championImage}`}
            className="medium-icon"
          />
          <span>{this.props.playerData.summonerName}</span>
        </div>
        <div className="player-item-stats">
          {this.renderLeagueInfo()}
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

export default connect(mapStateToProps)(CurrentGamePlayerItem)