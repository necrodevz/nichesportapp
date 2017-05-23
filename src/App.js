import React, { Component } from 'react';
//import logo from './logo.png';
//import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Landing from './Landing'
import {ApolloProvider} from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {client} from './apollo'
import {store} from './store'
import {openModal} from './actions' 
import {connect} from 'react-redux'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  
  render() {
    return (
      <ApolloProvider store={store} client={client} >
        <MuiThemeProvider>
          <Landing />
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App