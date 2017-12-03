import React from 'react'
import { connect } from 'react-redux'

import SearchBarAutosuggest from './SearchBarAutosuggest'

class MainSearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMessage: this.props.errorMessage
    }
  }

  componentDidMount() {
    document.title = 'LoLAtlas'
  }

  setErrorMessage(errorMessage) {
    this.setState({ errorMessage })
  }

  render() {
    return (
      <div className="search-bar-container">
        <div className="title-text">
          <h1>LoLAtlas</h1>
          <h2>The quickest live game lookup tool</h2>  
        </div>
        <div className='search-error-message'>
          {this.state.errorMessage}
        </div>
        <SearchBarAutosuggest
          history={this.props.history}
          setErrorMessage={this.setErrorMessage.bind(this)}
        />
      </div>
    )
  }
}

export default MainSearchBar