import React from 'react'
import { connect } from 'react-redux'

import SearchBarAutosuggest from './SearchBarAutosuggest'

const MainSearchBar = ({ history }) => {
  return (
    <div className="search-bar-container">
      <SearchBarAutosuggest
        history={history}
      />
    </div>
  )
}

export default MainSearchBar