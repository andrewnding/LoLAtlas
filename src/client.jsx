import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import store from './store/store'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'
import MainSearchBar from './components/MainSearchBar'
import CurrentGamePage from './components/CurrentGamePage'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={MainSearchBar} />
            <Route path="/:region/search" component={CurrentGamePage} />
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