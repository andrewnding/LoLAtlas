import React from 'react'
import axios from 'axios'

export default class ContactForm extends React.Component {
  constructor() {
    super()

    this.state = {
      isSending: false,
      didSend: false,
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

  handleSubmit() {
    this.setState({ isSending: true })
    axios.post('/api/sendEmail', this.state)
      .then(response => {
        this.setState({ isSending: false })
        this.setState({ didSend: true })
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

    if (this.state.isSending) {
      value = <span><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i> Submitting</span>
      classNames = "btn btn-primary"
    } else if (this.state.didSend) {
      value = <span>Submitted - Thanks for your feedback!</span>
      classNames = "btn btn-success"
    } else {
      value = <span>Submit</span>
      classNames = "btn btn-primary"
    }

    return (
      <button type="button" className={classNames} onClick={() => this.handleSubmit()}>{value}</button>
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