import React from 'react'
import axios from 'axios'
import XRegExp from 'xregexp'

export default class ContactForm extends React.Component {
  constructor() {
    super()

    this.state = {
      isSending: false,
      didSend: false,
      validEmail: false,
      name: "",
      email: "",
      comments: ""
    }
  }

  onChangeHandler(e) {
    let stateObj = {}
    stateObj[e.target.id] = e.target.value
    this.setState(stateObj)
  }

  validateEmail() {
    const emailRegex = new XRegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
    if (XRegExp.test(this.state.email, emailRegex)) {
      this.setState({ validEmail: true })
    } else {
      this.setState({ validEmail: false })
    }
  }

  handleSubmit() {
    if (!this.state.name || !this.state.email || !this.state.comments) {
      this.props.setBanner('FAILURE')
      return
    }

    if (!this.state.validEmail) {
      this.props.setBanner('INVALID EMAIL')
      return
    }

    this.setState({ isSending: true })
    axios.post('/api/sendEmail', this.state)
      .then(response => {
        this.setState({ isSending: false })
        this.setState({ didSend: true })
        this.props.setBanner('SUCCESS')
        return response
      })
      .catch(err => {
        this.setState({ isSending: false })
        this.setState({ didSend: true })
        return err.response
      })
  }

  renderButton() {
    let value
    let classNames
    let disabled

    if (this.state.isSending) {
      value = <span><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i> Submitting</span>
      classNames = "btn btn-primary"
      disabled = true
    } else if (this.state.didSend) {
      value = <span>Submitted - Thanks for your feedback!</span>
      classNames = "btn btn-success"
      disabled = true
    } else {
      value = <span>Submit</span>
      classNames = "btn btn-primary"
      disabled = false
    }

    return (
      <button
        type="button"
        className={classNames}
        onClick={() => this.handleSubmit()}
        disabled={disabled}
      >
        {value}
      </button>
    )
  }

  render() {
    return (
      <form className="form-page">
        <div className="form-block form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
            maxLength="100"
            onChange={(e) => this.onChangeHandler(e)}
          />
        </div>

        <div className="form-block form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            maxLength="100"
            onChange={(e) => this.onChangeHandler(e)}
            onBlur={() => this.validateEmail()}
          />
        </div>

        <div className="form-block form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            placeholder="Comments"
            maxLength="2000"
            rows="10"
            onChange={(e) => this.onChangeHandler(e)}
          />
        </div>

        <div className="form-block">
          {this.renderButton()}
        </div>
      </form>
    )
  }
}