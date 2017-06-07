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
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';

export class TeamDetailModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const{activeTeam}=this.props;
    return (
      activeTeam ? <div>
      <Notifications />
      <GridList cols={4} cellHeight={50} padding={1} style={{"margin-top":"20px"}}>
        <GridTile><b>Team Name:</b></GridTile>
        <GridTile>{activeTeam.name}</GridTile>
        <GridTile><b>Age Group:</b></GridTile>
        <GridTile>{activeTeam.ageGroup}</GridTile>
      </GridList>
      <GridList cols={4} cellHeight={50} padding={1}>
        <GridTile><b>Sport:</b></GridTile>
        <GridTile>{activeTeam.sport ? activeTeam.sport.name : 'Not Available'}</GridTile>
        <GridTile><b>No. of Players:</b></GridTile>
        <GridTile>{activeTeam.totalNumberOfAthelets}</GridTile>
      </GridList>
      <GridList cols={4} cellHeight={50} padding={1}>
        <GridTile><b>Season:</b></GridTile>
        <GridTile>{activeTeam.season}</GridTile>
      </GridList>
      <Divider />
     <h3 style={{textAlign: 'center'}}>Team Athletes List</h3>
     <Divider />
          <Table
            fixedHeader={true}
            selectable={false}
            multiSelectable={false}>
            >
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
              >
              <TableRow>
                <TableHeaderColumn style={{textAlign: 'center'}}>ID</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Email</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Invite</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Athlete Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              >
              {activeTeam.atheletTeams.map((athleteData, index)=>(
                <TableRow key={athleteData.athlete.user.id}>
                  <TableRowColumn style={{textAlign: 'center'}}>{index+1}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{athleteData.athlete.user.firstName} {athleteData.athlete.user.lastName}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}> {athleteData.athlete.user.email}</TableRowColumn>
                  <TableRowColumn style={{textAlign: 'center'}}>{athleteData.status}</TableRowColumn>
                </TableRow>
                ))
              }
            </TableBody>
          </Table>
    </div> : <div>Loading</div>
    );
  }
}

export default TeamDetailModal;

