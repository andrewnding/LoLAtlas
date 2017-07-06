import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import store from './store/store'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'
import MainSearchBar from './components/MainSearchBar'
import CurrentGamePage from './components/CurrentGamePage'
import PageNotFound from './components/PageNotFound'
require("!style-loader!css-loader!sass-loader!../public/stylesheets/main.scss");

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <MenuBar />
          <Switch>
            <Route exact path="/" component={MainSearchBar} />
            <Route path="/:region/search" component={CurrentGamePage} />
            <Route component={PageNotFound} />
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