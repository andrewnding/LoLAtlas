import React from 'react'
import axios from 'axios'

export default class ContactForm extends React.Component {
  constructor() {
    super()

    this.state = {
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
    axios.post('/api/sendEmail', this.state)
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
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
          <input type="button" className="btn btn-primary" value="Submit" onClick={() => this.handleSubmit()} />
        </div>
      </form>
    )
  }
}