import React from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import XRegExp from 'xregexp'

import * as actions from '../actions/searchActions'
var regionalEndpoints = require('../constants/regionalEndpoints')

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
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      suggestions: [],
      region: 'NA'
    }
  }

  onChange(event, { newValue }) {
    this.setState({
      name: newValue
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
    e.preventDefault()
    if (XRegExp.test(this.state.name, new XRegExp('^[0-9\\p{L} _\\.]+$'))) {
      console.log(`searching for player ${this.state.name}`)
      this.props.history.push(`/${this.state.region}/search?name=${this.state.name}`)
    } else {
      console.log('Please enter a valid summoner name')
    }
  }

  renderSelectOptions() {
    return (
      Object.keys(regionalEndpoints.regions).sort().map((region, i) => {
        return <option key={i} value={region}>{region}</option>
      })
    )
  }

  handleOnChangeRegion(e) {
    this.setState({
      region: e.target.value
    })
  }

  render() {
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a summoner name',
      value: this.state.name,
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
        <select 
          value={this.state.region} 
          onChange={this.handleOnChangeRegion.bind(this)}
        >
          { this.renderSelectOptions() }
        </select>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, actions)(SearchBarAutosuggest)