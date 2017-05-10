import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import injectTapEventPlugin from 'react-tap-event-plugin';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj2h8gmfd31i40188fz9ph2zk'}),
})
injectTapEventPlugin();
ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
);
