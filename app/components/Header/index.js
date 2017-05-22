import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import HeaderLink from './HeaderLink';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <MuiThemeProvider>
         <Toolbar>
        <ToolbarGroup>
        <HeaderLink to='/'>
          <ToolbarTitle text="Athliche Sports App" />
          </HeaderLink>
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
      </MuiThemeProvider>
    );
  }
}

export default Header;
// <NavBar>
//   <HeaderLink to="/">
//     <FormattedMessage {...messages.home} />
//   </HeaderLink>
//   <HeaderLink to="/features">
//     <FormattedMessage {...messages.features} />
//   </HeaderLink>
// </NavBar>
