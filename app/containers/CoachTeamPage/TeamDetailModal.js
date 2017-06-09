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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CoachInviteModal from '../../containers/CoachTeam/CoachInviteModal'


export class TeamDetailModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      showInvitationDialog: false,
      activeIndex: 0,
      activeTeam: null
    }
  }

  toggleInviteDialog(value, index) {
    var activeTeam = this.props.activeTeam; 
    this.setState({ showInvitationDialog: !value, activeIndex: index, activeTeam: activeTeam })
  }


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleInviteDialog(this.state.showInvitationDialog)}
      />
    ];

    const{activeTeam}=this.props;
    return (
      activeTeam ? <div style={{"margin":"80px"}}>
      <Notifications />

        <Dialog
          title="Invite Athlete List"
          autoScrollBodyContent={true}
          actions={actions}
          modal={false}
          autoDetectWindowHeight={true}
          open={this.state.showInvitationDialog}
          onRequestClose={()=>this.toggleInviteDialog(this.state.showInvitationDialog)}
        >
          <CoachInviteModal activeTeam={this.state.activeTeam} toggleInviteDialog={()=>this.toggleInviteDialog()} />
        </Dialog>
      <GridList cols={4} cellHeight={50} padding={1} >
        <GridTile><b>Team Name:</b></GridTile>
        <GridTile>{activeTeam.name}</GridTile>
        <GridTile></GridTile>
        <GridTile>
          <RaisedButton label="Invite More Athlete" style={{"float": "right","marginTop": "10px","marginRight": "10px"}} onTouchTap={() => this.toggleInviteDialog(this.state.showInvitationDialog, activeTeam.id)} primary={true} />
        </GridTile>
      </GridList>
      <GridList cols={4} cellHeight={50} padding={1} >
        <GridTile><b>Age Group:</b></GridTile>
        <GridTile>{activeTeam.ageGroup}</GridTile>
        <GridTile></GridTile>
        <GridTile><RaisedButton label="Back" style={{"float": "right","marginTop": "10px","marginRight": "10px"}} primary={true} /></GridTile>
      </GridList>
      <GridList cols={4} cellHeight={50} padding={1}>
        <GridTile><b>Sport:</b></GridTile>
        <GridTile>{activeTeam.sport ? activeTeam.sport.name : 'Not Available'}</GridTile>
      </GridList>
      <GridList cols={4} cellHeight={50} padding={1}>  
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
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>ID</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Email</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Invite</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Athlete Status</TableHeaderColumn>
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

