import React from 'react'
import { connect } from 'react-redux'
import { getCurrentGame } from '../actions/searchActions'
import { getRankedLeague, getAccountId, getRecentRankedMatches, getMatchDetails, getChampionMastery } from '../actions/currentGameActions'
import { getRealmVersion, getChampionImages, getChampionData, getSummonerSpells } from '../actions/staticDataActions'

import CurrentGameHeader from './CurrentGameHeader'
import CurrentGamePlayerList from './CurrentGamePlayerList'
import SearchBarAutosuggest from './SearchBarAutosuggest'
import LoadingScreen from './LoadingScreen'

class CurrentGamePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      receivedChampionImages: false,
      receivedChampionData: false,
      receivedSummonerSpells: false,
      receivedRealmVersion: false,
      numberOfSummonersLoaded: 0,
      numberOfMatchesLoaded: 0,
      numberOfChampionMasteriesLoaded: 0,
      searchError: ''
    }
  }

  componentDidMount() {
    this.loadCurrentGameData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.key !== this.props.location.key) {
      this.loadCurrentGameData()
    }
  }
  
  checkForErrors(response) {
    this.setState({ searchError: '' })

    if (response.data.error === 'PLAYER_NOT_FOUND') {
      this.setState({ searchError: 'PLAYER_NOT_FOUND' })
      return
    }

    if (response.data.error === 'GAME_NOT_FOUND') {
      this.setState({ searchError: 'GAME_NOT_FOUND' })
      return
    }

    // If not solo/duo queue ranked match
    if (response.data.gameQueueConfigId !== 420) {
      this.setState({ searchError: 'NOT_RANKED_GAME' })
      return
    }
  }

  loadCurrentGameData() {
    let searchParams = new URLSearchParams(this.props.location.search.substring(1));
    let name = searchParams.get('name');
    this.props.dispatch(getCurrentGame(this.props.match.params.region, name))
      .then(response => {
        if (response.data.error) {
          this.setState({ searchError: response.data.error })
          return
        }
        this.checkForErrors(response)
        
        if (this.state.searchError === 'NOT_RANKED_GAME') {
          return
        }

        if (response.status === 200) {
          this.setState({ searchError: '' })
          this.props.dispatch(getChampionImages(this.props.match.params.region))
            .then(response => {
              if (response.data.error) {
                this.setState({ searchError: response.data.error })
                return
              }
              if (response.status === 200) {
                this.setState({ receivedChampionImages: true })
              }
            }).catch(error => {
              console.log(error)
            })

          this.props.dispatch(getChampionData(this.props.match.params.region))
            .then(response => {
              if (response.data.error) {
                this.setState({ searchError: response.data.error })
                return
              }
              if (response.status === 200) {
                this.setState({ receivedChampionData: true })
              }
            }).catch(error => {
              console.log(error)
            })

          this.props.dispatch(getSummonerSpells(this.props.match.params.region))
            .then(response => {
              if (response.data.error) {
                this.setState({ searchError: response.data.error })
                return
              }
              if (response.status === 200) {
                this.setState({ receivedSummonerSpells: true })
              }
            }).catch(error => {
              console.log(error)
            })
          
          this.props.currentGame.gameInfo.participants.map(participant => {
            this.props.dispatch(getRankedLeague(this.props.match.params.region, participant.summonerId))
              .then(response => {
                if (response.data.error) {
                  this.setState({ searchError: response.data.error })
                  return
                }
                
              }).catch(error => {
                console.log(error)
              })
            
            this.props.dispatch(getAccountId(this.props.match.params.region, participant.summonerId))
              .then(response => {
                if (response.data.error) {
                  this.setState({ searchError: response.data.error })
                  return
                }
                this.props.dispatch(getRecentRankedMatches(this.props.match.params.region, response.data.accountId))
                  .then(response => {
                    if (response.data.error) {
                      this.setState({ searchError: response.data.error })
                      return
                    }
                    if (response.data.error !== 'NO_RECENT_RANKED_MATCHES') {
                      if (response.data.length < 5) {
                        this.setState({ numberOfMatchesLoaded: this.state.numberOfMatchesLoaded + (5 - response.data.length) })
                      }
                      response.data.map((match) => {
                        this.props.dispatch(getMatchDetails(this.props.match.params.region, participant.summonerId, match.gameId))
                          .then(response => {
                            if (response.data.error) {
                              this.setState({ searchError: response.data.error })
                              return
                            }
                            this.setState({ numberOfMatchesLoaded: this.state.numberOfMatchesLoaded + 1 })
                          }).catch(error => {
                            console.log(error)
                          })
                      })
                    } else {
                      this.setState({ numberOfMatchesLoaded: this.state.numberOfMatchesLoaded + 5 })
                    }
                    this.setState({ numberOfSummonersLoaded: this.state.numberOfSummonersLoaded + 1 })
                  }).catch(error => {
                    
                  })
              }).catch(error => {

              })
            
            this.props.dispatch(getChampionMastery(this.props.match.params.region, participant.summonerId, participant.championId))
              .then(response => {
                if (response.data.error) {
                  this.setState({ searchError: response.data.error })
                  return
                }
                this.setState({ numberOfChampionMasteriesLoaded: this.state.numberOfChampionMasteriesLoaded + 1 })
              }).catch(error => {

              })
          })
        }
      }).catch(error => {
        console.log(error)
      })

    this.props.dispatch(getRealmVersion(this.props.match.params.region))
      .then(response => {
        if (response.data.error) {
          this.setState({ searchError: response.data.error })
          return
        }
        if (response.status === 200) {
          this.setState({ receivedRealmVersion: true })
        }
      }).catch(error => {
        console.log(error)
      })
  }

  doneFetchingData() {
    return (
      this.state.receivedChampionImages && 
      this.state.receivedRealmVersion && 
      (this.state.numberOfSummonersLoaded === 10) && 
      (this.state.numberOfMatchesLoaded === 50) && 
      (this.state.numberOfChampionMasteriesLoaded === 10) && 
      this.state.receivedChampionData &&
      this.state.receivedSummonerSpells
    )
  }

  renderErrorPage(message) {
    return (
        <SearchBarAutosuggest
          history={this.props.history}
          errorMessage={message}
        />
      )
  }

  render() {
    if (!this.doneFetchingData() && !this.state.searchError) {
      return <LoadingScreen />
    }
    
    if (this.state.searchError) {
      if (this.state.searchError === 'PLAYER_NOT_FOUND') {
        return this.renderErrorPage('Player not found')
      } else if (this.state.searchError === 'GAME_NOT_FOUND') {
        return this.renderErrorPage('Player is not in a game')
      } else if (this.state.searchError === 'NOT_RANKED_GAME') {
        return this.renderErrorPage('Not a solo/duo ranked game')
      } else {
        return this.renderErrorPage(this.state.searchError)
      }  
    }
   
    return (
      <div>
        <CurrentGameHeader gameStartTime={this.props.currentGame.gameInfo.gameStartTime} />
        <CurrentGamePlayerList />
      </div>
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    search: state.searchReducer,
    currentGame: state.currentGameReducer,
    staticData: state.staticDataReducer
  }
}

export default connect(mapStateToProps)(CurrentGamePage)