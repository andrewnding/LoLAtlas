import React from 'react'

export default class Sample extends React.Component {
  componentDidMount() {
    document.title = 'LoLAtlas'
  }

  render() {
    return (
      <div className="sample-page">
        <img src="/images/sample_image.jpg" />
      </div>
    )
  }
}