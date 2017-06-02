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
import InviteTeamForm from './InviteTeamForm'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';



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
              <InviteTeamForm userData={this.props.data.user}/>
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

const coachQuery = gql`query coachQuery {
    user { id firstName lastName email country dob profileImage gender address timeZone mobileNumber height weight bio createdAt
    coach {
      id graduation graduationProgramLength graduationUniversity graduationYear hightSchool hightSchoolUniversity hightSchoolYear createdAt
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

const coachQueryData = graphql(coachQuery)(CoachTeam);

export default coachQueryData;
