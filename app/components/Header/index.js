import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router';
import HeaderLink from './HeaderLink';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import AthleteHeader from 'containers/AthleteHeader';
import CoachHeader from 'containers/CoachHeader';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      loggedIn: localStorage.getItem('token') ? true: false
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('userID');
  localStorage.removeItem('role');
  localStorage.removeItem('userName');
  window.location.assign("/");
  location.reload();
    
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="Athliche Sports" style={{"height":"70px"}} titleStyle={{"cursor": "pointer","width":"20px"}} showMenuIconButton={false} onRightIconButtonTouchTap={()=>this.logout()} onTitleTouchTap={()=>window.location.assign("/") }>
          {this.state.loggedIn && this.props.location.state && this.props.location.state.role =='ATHLETE' ? <AthleteHeader /> : ''}
          {this.state.loggedIn && this.props.location.state && this.props.location.state.role =='COACH' ? <CoachHeader /> : ''}
          {this.state.loggedIn ? <FlatButton onClick={()=>this.logout()} label='LogOut'  style={{"marginTop":"15px","color":"white"}} /> : ''}
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default Header;

