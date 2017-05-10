import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Header extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <AppBar
        title="Athliche Sports App"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      </MuiThemeProvider>
    );
  }
}

export default Header;
