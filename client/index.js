import React from 'react'
import {render} from 'react-dom'
import Intro from './components/Intro'
import App from './components/App'
import {Router, Route, browserHistory} from 'react-router'

const routes =
  <Router history={browserHistory}>
    <Route path="/" component={Intro} />
    <Route path="/second" component={App} />
  </Router>

const rootEl = document.querySelector('#root')
render(routes, rootEl)
