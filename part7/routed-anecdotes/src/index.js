import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useHistory,
} from "react-router-dom" 

ReactDOM.render(
  <Router>
      <App/> 
  </Router>, document.getElementById('root'))