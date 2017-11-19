import React from 'react'

export default class About extends React.Component {
  render() {
    return (
      <div className="about-page">
        <h1 className="page-title">About</h1>
        <div className="about-block">
          <h2>What is LoLAtlas?</h2>
          <p>
            LoLAtlas is a tool that allows you to look up live ranked solo/duo queue League of Legends matches.
            It provides information about each player in the game, including recent ranked matches data,
            winning/losing streaks, current champion mastery, and the last time the current champion was played.
            LoLAtlas allows you to quickly evaluate your allies and opponents and can help you identify the paths
            to victory.
          </p>
        </div>

        <div className="about-block">
          <h2>How do I use LoLAtlas?</h2>
          <p>
            As soon as a match enters the loading screen, you can enter the name of one of the players in the
            match and LoLAtlas will load the match data.
          </p>
        </div>
      </div>
    )
  }
}