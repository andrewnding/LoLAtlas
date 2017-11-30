import React from 'react'

class PageNotFound extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.title = 'LoLAtlas - About'
  }

  render() {
    return (
      <div>Page Not Found</div>
    )
  }
}

export default PageNotFound