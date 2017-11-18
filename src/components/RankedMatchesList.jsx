import React from 'react'
import RankedMatchesItem from './RankedMatchesItem'

export default class RankedMatchesList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderRankedMatchesItems() {
    if (this.props.matches.length === 0) {
      return (
        <div className="text-align-center">
          No Ranked Matches
        </div>
      )
    }

    return (
      this.props.matches.map((match, i) => {
        return (
          <div key={i}>
            <RankedMatchesItem
              match={match}
              player={this.props.player}
            />
          </div>
        )
      })
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