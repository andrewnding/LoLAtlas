import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import store from './store/store'
import helloWorld from './actions/helloWorldAction'

import MainSearchBar from './components/MainSearchBar'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={MainSearchBar} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

render(
  <App />,
  document.getElementById('app')
);