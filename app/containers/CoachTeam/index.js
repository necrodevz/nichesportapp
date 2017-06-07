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
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';



export class CoachTeam extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        {this.props.TeamsList && <CoachTeamPage TeamsList={this.props.TeamsList} />}
      </div>
    );
  }
}

const coachTeamQuery = gql`query coachTeamQuery ($userId: ID){
   allTeams(filter: {
      coach: {
        user:{
          id: $userId
        }
    }
  }
   ) {
    id
    name
    atheletTeams{
      athlete{ id user{ id email firstName lastName } }
      status
      athleteMessage
    }
    season
    ageGroup
    totalNumberOfAthelets
    createdAt
    sport { id name }
    coach { id user { id email firstName lastName }}
    manager { id user { id email firstName lastName }}
  }
}`

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

const coachQueryData = compose(
  graphql(coachQuery),
  graphql(coachTeamQuery , {name: 'TeamsList'}, {
  options: (props) => ({ variables: { userId: props.userId } })
}))(CoachTeam);

export default coachQueryData;
