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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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
              <CoachSchedule coachProfile={this.props.data.user} />
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

const coachQuery = gql`query coachQuery {
    user { id firstName lastName email country dob profileImage gender address timeZone mobileNumber height weight bio createdAt
    coach {
      id graduation graduationProgramLength graduationUniversity graduationYear hightSchool hightSchoolUniversity hightSchoolYear createdAt
      institute {
        id
      }
      coachSports {
        id
        sport { id }
        participateStartDate
        coachAcadmicCertificates { id url }
      }
      coachAcadmic { id
        coach { id }
        institute { id }
        sport { id }
        createdAt
      }
    }
  }
}`

const coachProfileData = graphql(coachQuery)(CoachDashboard);

export default coachProfileData;

