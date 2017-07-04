import React from 'react'
import { connect } from 'react-redux'

class CurrentGamePlayerItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let imageName = this.props.currentGame.championImages.filter(championImage => {
      return championImage.id === this.props.playerData.championId
    })
    return (
      <div>
        <img src={`http://ddragon.leagueoflegends.com/cdn/${this.props.currentGame.realmVersion}/img/champion/${imageName[0].image.full}`} />
        {this.props.playerData.summonerName}
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