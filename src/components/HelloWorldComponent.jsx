import React from 'react'
import { connect } from 'react-redux'
import helloWorld from '../actions/helloWorldAction'

const HelloWorldComponent = (props) => {
  return (
    <div>
      Hello World
      <button onClick={() => props.dispatch(helloWorld())}>Click Me!</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    helloWorldReducer: state.helloWorldReducer
  }
}

export default connect(mapStateToProps)(HelloWorldComponent)