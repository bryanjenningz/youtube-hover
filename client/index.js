import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import {Router, Route, browserHistory} from 'react-router'

const routes =
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>

const rootEl = document.querySelector('#root')
render(routes, rootEl)
