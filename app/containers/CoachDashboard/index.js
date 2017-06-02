/*
 *
 * CoachDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CoachTeam from '../../containers/CoachTeam';
import CoachSchedule from '../../containers/CoachSchedule';
import CoachVideo from '../../containers/CoachVideo';
import CoachSearch from '../../containers/CoachSearch';
import {Tabs, Tab} from 'material-ui/Tabs';

const userId = localStorage.getItem('userID')

export class CoachDashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Tabs>
            <Tab label="Team" >
              <CoachTeam userId={userId} />
            </Tab>
            <Tab label="Schedule" >
              <CoachSchedule />
            </Tab>
            <Tab label="Video" >
              <CoachVideo />
            </Tab>
            <Tab label="Search" >
              <CoachSearch />
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

CoachDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CoachDashboard);
