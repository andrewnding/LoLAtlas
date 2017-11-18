import React from 'react'

export default class About extends React.Component {
  render() {
    return (
      <div className="about-page">
        <h2>What is LoLPreview?</h2>
        <p>
          LoLPreview is a tool that allows you to look up live ranked solo/duo queue League of Legends matches.
          It provides information about each player in the game, including recent ranked matches data,
          winning/losing streaks, current champion mastery, and the last time the current champion was played.
          LoLPreview allows you to evaluate your allies and opponents and can help you identify the paths
          to victory.
        </p>

        <h2>How do I use LoLPreview?</h2>
        <p>
          As soon as a match enters the loading screen, you can enter the name of one of the players in the
          match and LoLPreview will load the match data.
        </p>
      </div>
    )
  }
}