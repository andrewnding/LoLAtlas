import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import store from './store/store'
import MenuBar from './components/MenuBar'
import Footer from './components/Footer'
import MainSearchBar from './components/MainSearchBar'
import CurrentGamePage from './components/CurrentGamePage'
import About from './components/About'
import Contact from './components/Contact'
import PrivacyPolicy from './components/PrivacyPolicy'
import Blog from './components/Blog'
import Sample from './components/Sample'
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
            <Route exact path="/about" component={About} />
            <Route exact path="/sample" component={Sample} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route exact path="/blog" component={Blog} />
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