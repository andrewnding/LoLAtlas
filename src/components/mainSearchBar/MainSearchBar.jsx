import React from 'react'
import { connect } from 'react-redux'

import SearchBarAutosuggest from './SearchBarAutosuggest'

class MainSearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.title = 'LoLAtlas'
  }

  render() {
    return (
      <div>
        <SearchBarAutosuggest
          history={this.props.history}
        />
      </div>
    )
  }
}

export default MainSearchBar