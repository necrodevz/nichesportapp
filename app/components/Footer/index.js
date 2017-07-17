import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const nearbyIcon = <IconLocationOn />;

// const StyleFooter = {
//   bottom: 0,
//   position: 'absolute',
//   width: '100%',
// };

class Footer extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({ selectedIndex: index });

  render() {
    return (
      <MuiThemeProvider>
        <Paper zDepth={1}>
          <div>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Copyright @ Athliche Sports 2017"
                icon={nearbyIcon}
                style={{ maxWidth:300, cursor:"text"}}
                onTouchTap={() => this.select(0)}
              />
              <BottomNavigationItem
                label="Privacy Policy"
                icon={nearbyIcon}
                onTouchTap={() => this.select(1)}
              />
              <BottomNavigationItem
                label="Terms & Conditions"
                icon={nearbyIcon}
                onTouchTap={() => this.select(2)}
              />
              <BottomNavigationItem
                label="Support"
                icon={nearbyIcon}
                onTouchTap={() => this.select(3)}
              />
              <BottomNavigationItem
                label="Contact Us"
                icon={nearbyIcon}
                onTouchTap={() => this.select(4)}
              />
            </BottomNavigation>
          </div>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default Footer;
