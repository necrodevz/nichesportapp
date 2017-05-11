import React from 'react';
// import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import A from './A';
// import Img from './Img';
// import NavBar from './NavBar';
// import HeaderLink from './HeaderLink';
// import Banner from './banner.jpg';
// import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="Athliche Sports App" iconClassNameRight="muidocs-icon-navigation-expand-more" />
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
