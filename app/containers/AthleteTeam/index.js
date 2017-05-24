/*
 *
 * AthleteTeam
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyTeamForm from './MyTeamForm'

export class AthleteTeam extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <MuiThemeProvider>
          <Tabs>
            <Tab label="My Team" >
              <MyTeamForm/>
            </Tab>
            <Tab label="Apply for Team" >
            </Tab>
          </Tabs>
        </MuiThemeProvider>
    );
  }
}

AthleteTeam.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AthleteTeam);
