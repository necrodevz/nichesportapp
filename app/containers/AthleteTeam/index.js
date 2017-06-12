/*
 *
 * AthleteTeam
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AthleteTeamList from './AthleteTeamList'
import ApplyTeamForm from './ApplyTeamForm'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

var userId = localStorage.getItem('userID');

export class AthleteTeam extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      User: React.PropTypes.object,
    }).isRequired,
  }

  render() {
    return (
      <MuiThemeProvider>
          <Tabs>
            <Tab label="My Team" >
              <AthleteTeamList userId={userId} />
            </Tab>
            <Tab label="Apply for Team" >
              <ApplyTeamForm userData={this.props.data.user}/>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
    );
  }
}

AthleteTeam.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const athleteQuery = gql`query athleteQuery {
   user { id firstName lastName email country dob profileImage gender address timeZone mobileNumber height weight bio createdAt
    athlete {
      id graduation graduationProgramLength graduationUniversity graduationYear hightSchool hightSchoolUniversity hightSchoolYear createdAt
      athleteSports {
        id
        sport { id }
        participateStartDate
        athleteAcadmicCertificates { id url }
      }
      athletAcadmic { id
        athlete { id }
        institute { id }
        sport { id }
        createdAt
      }
    }
  }
}`

const AthleteQueryData = graphql(athleteQuery)(AthleteTeam);

export default AthleteQueryData;

