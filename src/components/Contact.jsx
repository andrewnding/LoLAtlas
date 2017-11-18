import React from 'react'

import ContactForm from './ContactForm'

export default class Contact extends React.Component {
  render() {
    return (
      <div className="contact-page">
        <h1 className="page-title">Contact</h1>
        <ContactForm />
      </div>
    )
  }
}