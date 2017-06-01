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

const athleteQuery = gql`query athleteQuery {
   allTeams(filter: {
      coach: {
        user:{
          id:"cj32wk6prqm2u01924qmn8y4r"
        }
    }
  }
   ) {
    id
    name
    season
    ageGroup
    totalNumberOfAthelets
    createdAt
    sport { id name }
    coach { id user { id email firstName lastName }}
    manager { id user { id email firstName lastName }}
  }
}`
 
const AthleteQueryData = graphql(athleteQuery)(CoachTeam);

export default AthleteQueryData;
