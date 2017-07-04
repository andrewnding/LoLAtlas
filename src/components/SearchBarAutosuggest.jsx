import React from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import * as actions from '../actions/currentGameActions'

import { getCurrentGameInfo } from '../actions/currentGameActions'

const usernames = ["Pahnis", "SirBuzzKill"]

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : usernames.filter(username =>
    username.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const getSuggestionValue = suggestion => suggestion

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
)

class SearchBarAutosuggest extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      suggestions: []
    }
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    })
  }

  handleSubmit(e) {
    if (!(/^[\w.\ ]+$/.test(this.state.value))) {
      console.log('Please enter a valid summoner name')
    } else {
      console.log(`searching for player ${this.state.value}`)
      this.props.getCurrentGameInfo('NA', this.state.value)
    }
    e.preventDefault()
  }

  render() {
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a summoner name',
      value: this.state.value,
      onChange: this.onChange.bind(this)
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, actions)(SearchBarAutosuggest)