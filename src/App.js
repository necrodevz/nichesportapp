import React, { Component } from 'react';
import logo from './logo.png';
//import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Landing from './Landing'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ApolloClient, createNetworkInterface, ApolloProvider }from 'react-apollo'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  
  networkInterface = createNetworkInterface({
    uri: process.env.REACT_APP_GQL_URI
  })
  
  client = new ApolloClient({
    networkInterface:this.networkInterface
  })
  
  render() {
    return (
      <ApolloProvider client={this.client} >
        <MuiThemeProvider>
          <Landing />
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
