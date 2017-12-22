import React from 'react'

import ContactForm from './ContactForm'

export default class Contact extends React.Component {
  constructor() {
    super()

    this.state = {
      bannerMode: 'NONE'
    }
  }

  componentDidMount() {
    document.title = 'LoLAtlas - Contact'
  }

  renderBanner() {
    switch (this.state.bannerMode) {
      case 'NONE':
        return <div></div>
      case 'SUCCESS':
        return <div className="alert alert-success" role="alert">Thanks for the feedback. We will get back to you soon!</div>
      case 'FAILURE':
        return <div className="alert alert-danger" role="alert">Please fill out all fields</div>
      case 'INVALID EMAIL':
        return <div className="alert alert-danger" role="alert">Please use a valid email</div>
    }
  }

  setBanner(bannerMode) {
    this.setState({ bannerMode })
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="contact-page">
        {this.renderBanner()}
        <h1 className="page-title">Contact</h1>
        <p>
          Please feel free to contact us with any questions, comments, or suggestions you may have.
        </p>
        <ContactForm setBanner={(bannerMode) => this.setBanner(bannerMode)} />
      </div>
    )
  }
}