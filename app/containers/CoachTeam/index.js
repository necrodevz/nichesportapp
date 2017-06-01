/*
 *
 * CoachDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import CoachTeamPage from '../../containers/CoachTeamPage';
import CoachInvitePage from '../../containers/CoachInvitePage';



export class CoachTeam extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Tabs>
            <Tab label="My Team">
              <CoachTeamPage />
            </Tab>
            <Tab label="Invite Team">
              <CoachInvitePage/>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

CoachTeam.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CoachTeam);
