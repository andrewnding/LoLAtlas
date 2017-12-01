import React from 'react'
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest'
import XRegExp from 'xregexp'
import classNames from 'classnames'

import { getSearchHistory } from '../../actions/searchActions'
var regionalEndpoints = require('../../constants/regionalEndpoints')

class SearchBarAutosuggest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      doneFetchingData: false,
      name: '',
      suggestions: [],
      searchHistory: [],
      region: 'NA',
      isFocused: false
    }
  }

  componentDidMount() {
    this.props.dispatch(getSearchHistory())
      .then(response => {
        this.setState({
          doneFetchingData: true,
          name: response.data.summonerName || '',
          region: response.data.serviceRegion || 'NA',
          searchHistory: response.data.searchHistory || []
        })
      })
  }

  onChange(event, { newValue }) {
    this.setState({
      name: newValue
    })
  }

  onFocus() {
    this.setState({ isFocused: true })
  }

  onBlur() {
    this.setState({ isFocused: false })
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    const searchHistoryNames = this.state.searchHistory.map((summoner) => summoner.summonerName)

    return inputLength === 0 ? [] : searchHistoryNames.filter(suggestion =>
      suggestion.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  getSuggestionValue(suggestion) {
    return suggestion
  }

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion}
      </div>
    )
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
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
    if (XRegExp.test(this.state.name, new XRegExp('^(?!.*\\bRiot\\b)[0-9\\p{L} _\\.]{3,16}$', 'i'))) {
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
    const searchBarItemsClassNames = classNames({
      'not-focused': !this.state.isFocused,
      'search-bar-items': true,
      'row': true
    })

    if (this.state.doneFetchingData) {
      // Autosuggest will pass through all these props to the input.
      const inputProps = {
        placeholder: 'Summoner Name',
        value: this.state.name,
        onChange: this.onChange.bind(this),
        className: 'search-input',
        onFocus: this.onFocus.bind(this),
        onBlur: this.onBlur.bind(this)
      }

      return (
        <div className="search-bar-container">
          <div className="title-text">
            <h1>LoLAtlas</h1>
            <h2>The quickest live game lookup tool</h2>  
          </div>
          <div className='search-error-message'>
            {this.props.errorMessage}
          </div>
          <form className={searchBarItemsClassNames} onSubmit={this.handleSubmit.bind(this)}>
            <div className="col-md-8">
              <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={this.getSuggestionValue.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                inputProps={inputProps}
              />
            </div>
            <div className="col-md-2">
              <select 
                className="form-control region-select"
                value={this.state.region} 
                onChange={this.handleOnChangeRegion.bind(this)}
              >
                { this.renderSelectOptions() }
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary search-button"
              />
            </div>
          </form>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.searchReducer
  }
}

export default connect(mapStateToProps)(SearchBarAutosuggest)