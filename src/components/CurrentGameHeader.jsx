import React from 'react'
import secondsToTime from '../utils/secondsToTime'

export default class CurrentGameHeader extends React.Component {
  constructor(props) {
    super(props)
    let gameStartTime = this.props.gameStartTime
    let currentTime = Date.now()
    let currentGameDuration = (currentTime - gameStartTime) / 1000

    this.state = {
      currentGameDuration
    }
  }

  incrementTime() {
    this.setState({
      currentGameDuration: this.state.currentGameDuration + 1
    })
  }

  renderTime(time) {
    let minutes = time.minutes < 10 ? '0' + time.minutes : time.minutes.toString()
    let seconds = time.seconds < 10 ? '0' + time.seconds : time.seconds.toString()
    let hours

    if (time.hours > 0) {
      hours = time.hours < 10 ? '0' + time.hours : time.hours.toString()
      return `${hours}:${minutes}:${seconds}`
    }

    return  `${minutes}:${seconds}`
  }

  componentDidMount() {
    setInterval(() => this.incrementTime(), 1000)
  }

  render() {
    let time = secondsToTime(this.state.currentGameDuration)
    return (
      <div className='current-game-header space-between vertical-align'>
        <span>Summoner's Rift</span>
        <span>{this.renderTime(time)}</span>
        <span>Ranked Solo/Duo</span>
      </div>
    )
  }
}