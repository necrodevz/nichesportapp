/*
 *
 * TeamDetailModal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import RaisedButton from 'material-ui/RaisedButton';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import Notifications, {notify} from 'react-notify-toast';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export class TeamDetailModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const{activeTeam}=this.props;
    return (
      activeTeam ? <CenteredSection>
      <Notifications />
      <h2>Team Name: {activeTeam.name}</h2>
      <h4>
         <div>Age Group: {activeTeam.ageGroup}</div>
         <br/>
         <div>Sport: {activeTeam.sport ? activeTeam.sport.name : 'Not Available'}</div>
         <br/>
         <div>No. of Players: {activeTeam.totalNumberOfAthelets}</div>
         <br/>
         <div>Season: {activeTeam.season}</div>
         </h4>
         <h3>Team Athletes List</h3>
         <h4>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Invite</TableHeaderColumn>
                <TableHeaderColumn>Athlete Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {activeTeam.atheletTeams.map((athleteData, index)=>(
                <TableRow key={athleteData.athlete.user.id}>
                  <TableRowColumn>{index+1}</TableRowColumn>
                  <TableRowColumn>{athleteData.athlete.user.firstName} {athleteData.athlete.user.lastName}</TableRowColumn>
                  <TableRowColumn>{athleteData.athlete.user.email}</TableRowColumn>
                  <TableRowColumn>{athleteData.status}</TableRowColumn>
                </TableRow>
                ))
              }
            </TableBody>
          </Table>
         </h4>
    </CenteredSection> : <div>Loading</div>
    );
  }
}

export default TeamDetailModal;

