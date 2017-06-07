/*
 *
 * InstituteDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectInstituteDashboard from './selectors';
import H1 from 'components/H1';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import InstituteTeamPage from '../../containers/InstituteTeamPage'
import InstituteCalendar from '../../containers/InstituteCalendar'
import InstituteCoachPage from '../../containers/InstituteCoachPage'

export class InstituteDashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Tabs>
            <Tab label="Team" >
              <InstituteTeamPage/>
            </Tab>
            <Tab label="Calendar/Schedule" >
              <InstituteCalendar />
            </Tab>
            <Tab label="Coach" >
              <InstituteCoachPage />
            </Tab>
            <Tab label="Search" >
            <div style={{"float": "left","height":"400px"}}>Search Page</div>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

InstituteDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  InstituteDashboard: makeSelectInstituteDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstituteDashboard);
