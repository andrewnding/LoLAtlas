import React from 'react'
import { connect } from 'react-redux'

class CurrentGamePlayerItem extends React.Component {
  constructor(props) {
    super(props)
  }

  rankedBadgeSrc() {
    let rankedData = this.props.playerData.rankedData
    if (!rankedData) {
      // Error
      return ''
    }

    if (rankedData.length === 0) {
      // Unranked
      return `/images/ranked-badges/base-icons/provisional.png`
    }

    if (['MASTER', 'CHALLENGER'].indexOf(rankedData.tier) !== -1) {
      // Master and Challenger don't have ranks
      return `/images/ranked-badges/base-icons/${rankedData.tier.toLowerCase()}.png`
    }

    // Bronze through Diamond
    return `/images/ranked-badges/tier-icons/${rankedData.tier.toLowerCase()}_${rankedData.entries[0].rank.toLowerCase()}.png`
  }

  render() {
    return (
      <div>
        <div className="player-item-title">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/${this.props.currentGame.realmVersion}/img/champion/${this.props.playerData.championImage}`}
            className="medium-icon"
          />
          <span>{this.props.playerData.summonerName}</span>
        </div>
        <div className="player-item-stats">
          <img
            src={this.rankedBadgeSrc()}
            className="medium-icon"
          />
          {/*<span>{this.props.playerData}</span>*/}
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