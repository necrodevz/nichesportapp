import React from 'react'
import AuthService from './auth-utils/AuthService'
import Container from './views/Container'
import Home from './views/Home'
import Login from './views/Login'

import {browserHistory, Router, Route, Redirect,IndexRedirect} from 'react-router'

const auth = new AuthService(process.env.AUTH0_CLIENTID,
 process.env.AUTH0_DOMAIN);

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const isloggedIn = (nextState, replace) => {

  if(auth.loggedIn()){
    replace({ pathname: '/home' })
  }

}

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} onEnter={requireAuth} />
      <Route path="login" component={Login} onEnter={isloggedIn} />
    </Route>
  )
}

export default makeMainRoutes



