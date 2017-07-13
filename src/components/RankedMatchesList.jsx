import React from 'react'
import RankedMatchesItem from './RankedMatchesItem'

export default class RankedMatchesList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRankedMatchesItems() {
    return (
      this.props.matches.map((match, i) => (
        <div key={i}>
          <RankedMatchesItem
            match={match}
            playerData={this.props.playerData}
          />
        </div>
      ))
    )
  }

  render() {
    return (
      <div>
        {this.renderRankedMatchesItems()}
      </div>
    )
  }
}