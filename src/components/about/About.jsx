import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { findExampleSummoner } from '../../actions/searchActions';

class About extends React.Component {
  componentDidMount() {
    document.title = 'LoLAtlas - About'
  }

  getExampleSearch() {
    this.props.dispatch(findExampleSummoner())
      .then(response => {
        this.props.history.push(`/NA/search?name=${this.props.search.exampleSummoner}`)
      })
  }

  renderGetExampleSearch() {
    if (!this.props.search.isFetchingExampleSummoner) {
      return <a onClick={this.getExampleSearch.bind(this)}>here</a>
    }

    return <span className="green-text">Searching for a sample game <i className="fa fa-spinner fa-spin fa-fw"></i></span>
  }

  render() {
    return (
      <div className="info-page">
        <h1 className="page-title">About</h1>
        <div className="info-block">
          <h2>What is LoLAtlas?</h2>
          <p>
            LoLAtlas is a League of Legends tool that allows you to look up live ranked solo/duo queue matches.
            It allows you to quickly evaluate your allies and opponents and can help you identify the paths
            to victory.
          </p>
        </div>

        <div className="info-block">
          <h2>How do I use LoLAtlas?</h2>
          <p>
            As soon as a match enters the loading screen, you can enter the name of one of the players in the
            match and LoLAtlas will load the match data.
          </p>
        </div>

        <div className="info-block">
          <h2>What information does LoLAtlas provide?</h2>
          <p>
            LoLAtlas provides information about each player in the game, including recent ranked matches data,
            winning/losing streaks, current champion mastery, and the last time the current champion was played.
            You can see an example search {this.renderGetExampleSearch()}.
          </p>
        </div>

        <div className="info-block">
          <h2>What makes LoLAtlas different from other live game websites?</h2>
          <p>
            One major feature of LoLAtlas that sets it apart from other websites is that it shows recent match
            details for every player in the game. This allows you to get a quick glance at each player's recent
            match history in detail on a single page. In addition to common metrics such as rank, season 
            win rate, and winning or losing streaks that other live game websites provide, LoLAtlas provides 
            less commonly found metrics such as a player's champion mastery for their current champion, the 
            last time they played that champion, and whether they won or lost a game recently, since it is common 
            for people to go on hot or cold streaks. An important feature that LoLAtlas is missing is
            champion-specific winrates. Calculating this information requires a large amount of memory storage on
            our part. As of right now, the cost of that is too large, but we will add this feature in the future
            if we are able to.
          </p>
        </div>

        <div className="info-block">
          <h2>Will there be more updates to LoLAtlas?</h2>
          <p>
            LoLAtlas is still in open beta and it is currently a one-man project, so more features will
            be added as time permits. Feedback through the <Link to="/contact"> Contact </Link> page is
            greatly appreciated and will be taken into consideration!
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.searchReducer
  }
}

export default connect(mapStateToProps)(About)