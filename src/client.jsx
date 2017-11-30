import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import store from './store/store'
import MenuBar from './components/other/MenuBar'
import Footer from './components/other/Footer'
import MainSearchBar from './components/mainSearchBar/MainSearchBar'
import CurrentGamePage from './components/currentGamePage/CurrentGamePage'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy'
import Blog from './components/blog/Blog'
import Sample from './components/sample/Sample'
import PageNotFound from './components/pageNotFound/PageNotFound'
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