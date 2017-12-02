import React from 'react'
import { Link } from 'react-router-dom'

export default class About extends React.Component {
  componentDidMount() {
    document.title = 'LoLAtlas - About'
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
            You can see an example search <Link to="/sample"> here</Link>.
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