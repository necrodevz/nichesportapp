/*
 *
 * CoachInviteModal
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


export class CoachInviteModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    approveTeam: React.PropTypes.func,
    rejectTeam: React.PropTypes.func,
  }

  approveTeam = async (index) => {
    await this.props.approveTeam({variables: {teamId: this.props.activeTeam.id,
      athleteId: this.props.athletesList.allAthletes[index].id}
                 }).then(()=>notify.show('Athlete Invited Successfully', 'success')).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const{activeTeam, athletesList}=this.props;
    return (
      athletesList.allAthletes ? <CenteredSection>
      <Notifications />
            <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
        <TableHeaderColumn>Invite</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {athletesList.allAthletes.map((athlete, index)=>(
      <TableRow key={athlete.id}>
        <TableRowColumn>{index+1}</TableRowColumn>
        <TableRowColumn>{athlete.user.firstName} {athlete.user.lastName}</TableRowColumn>
        <TableRowColumn>{athlete.user.email}</TableRowColumn>
        <TableRowColumn>
        <RaisedButton label="Invite" onTouchTap={()=>this.approveTeam(index)} primary={true} />
        </TableRowColumn>
      </TableRow>
      ))
    }
    </TableBody>
  </Table>
            </CenteredSection> : <div>Loading</div>
    );
  }
}


const approveTeamMutation = gql`
  mutation approveTeam ($athleteId: ID, $teamId: ID){
    createAtheletTeam(
    athleteId: $athleteId
    teamId: $teamId
    status: ATHLETEPENDING
  ) {
    id
  }
  }
`

const NotificationDataQuery = gql`query NotificationDataQuery ($sportId: ID) {
    allAthletes(
    filter:{
      atheletTeams_none:{
        status_in:[ COACHPENDING MANAGERPENDING INSTITUTEPENDING APPROVEDBYATHLETE APPROVEDBYCOACH APPROVEDBYINSTITUTE ATHLETEPENDING]
        team:{
          sport:{
            id: $sportId
          }
        } 
      }
    }
  ){
    id
    user{ email firstName lastName }
  }
}`

const NotificationData = compose(
  graphql(approveTeamMutation, {name: 'approveTeam'}),
  graphql(NotificationDataQuery, {name: 'athletesList'}, {
  options: (props) => ({ variables: { sportId: props.activeTeam.sport ? props.activeTeam.sport.id : '' } }),
}))(CoachInviteModal);


export default NotificationData;

