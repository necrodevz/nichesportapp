import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import HeaderLink from './HeaderLink';
import AppBar from 'material-ui/Appbar';
import { push } from 'react-router-redux';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      loggedIn: localStorage.getItem('token') ? true: false
    }
  }

  logout(){
  localStorage.removeItem('token');
  window.location.assign("/");
  location.reload();
    
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="Athliche Sports App" showMenuIconButton={false} onRightIconButtonTouchTap={()=>this.logout()} onTitleTouchTap={()=>window.location.assign("/")} iconElementRight={this.state.loggedIn ? <FlatButton onClick={()=>this.logout()} label="LogOut" /> : ''}/>
      </MuiThemeProvider>
    );
  }
}

export default Header;

