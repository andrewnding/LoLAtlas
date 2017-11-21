import React from 'react'
import { Link } from 'react-router-dom'

export default class PrivacyPolicy extends React.Component {
  render() {
    return (
      <div className="info-page">
        <h1 className="page-title">Privacy Policy</h1>
        <div>
          <div className="info-block">
            <p>
              Thanks for visiting our website. Your privacy is important to us, so we have outlined what
              data we use and how we use it below.
            </p>
          </div>

          <div className="info-block">
            <h2>Cookies</h2>
            <p>
              We use cookies to remember your previous searches and what regions you searched in order to 
              help you easily repeat searches on summoners and regions. If you prefer to disable cookies,
              you can do so through your browser settings.
            </p>
          </div>

          <div className="info-block">
            <h2>Analytics and Advertisements</h2>
            <p>
              We use Google Analytics to understand usage patterns for our website. For more information
              about how Google Analytics uses data, please
              <a href="https://www.google.com/policies/privacy/partners" target="_blank"> click here</a>.
              To opt out of Google Analytics, please
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank"> click here</a>.
            </p>
          </div>

          <div className="info-block">
            <h2>Changes to Our Privacy Policy</h2>
            <p>
              Any changes to our privacy policy can be found here. You will be notified by a website
              notification and the Last Updated date will be changed.
            </p>
            <p>
              Last Updated: 11/20/2017
            </p>
          </div>

          <div className="info-block">
            <h2>Contacting Us</h2>
            <p>
              You can contact us with any questions about our Privacy Policy by visiting the
              <Link to="/contact"> Contact Us</Link> page.
            </p>
          </div>
        </div>
      </div>
    )
  }
}