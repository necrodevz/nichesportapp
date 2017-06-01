import React from 'react';
import H1 from 'components/H1';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InstituteListPage from '../../containers/Institute/InstituteListPage'
import Athlete from '../../containers/Athlete'
import Coach from '../../containers/Coach'

export default class DashboardPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Tabs>
            <Tab label="Institute" >
              <InstituteListPage/>
            </Tab>
            <Tab label="Coach" >
              <Coach />
            </Tab>
            <Tab label="Athlete" >
              <Athlete />
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}
