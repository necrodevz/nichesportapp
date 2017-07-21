/*
 *
 * CoachInviteModal
 *
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
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
import Loading from 'components/LoadingIndicator';
import {removeExtraChar} from '../Global/GlobalFun';


export class CoachInviteModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      invites: []
    }
  }

  static propTypes = {
    approveTeam: React.PropTypes.func,
    rejectTeam: React.PropTypes.func,
  }
  
  disableInvitesList (index) {
    var invites = this.state.invites;
    invites.push(index);
    this.setState({ invites: invites });
  }  

  approveTeam = async (index) => {
    await this.props.approveTeam({variables: {teamId: this.props.activeTeam.id,
      athleteId: this.props.athletesList.allAthletes[index].id}
                 }).then(()=>notify.show('Athlete Invited Successfully', 'success')).then(()=>this.disableInvitesList(index)).then(()=>this.props.TeamsList.refetch()).catch((res)=>notify.show(removeExtraChar(res), 'error'))
  }

  render() {
    const{activeTeam, athletesList}=this.props;
    return (
      athletesList.allAthletes ? (athletesList.allAthletes.length > 0 ? <CenteredSection>
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
        <RaisedButton label="Invite" disabled={this.state.invites.includes(index) ? true : false} onTouchTap={()=>this.approveTeam(index)} primary={true} />
        </TableRowColumn>
      </TableRow>
      ))
    }
    </TableBody>
  </Table>
            </CenteredSection> : <div>No Athletes Available To Invite </div> ): <Loading />
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


const AthleteDataQuery = gql`query AthleteDataQuery ($sportId: [ID!], $athleteIds: [ID!])
{
  allAthletes(filter: 
    {
     AND: [
      {atheletTeams_every:{
        status_in:[APPROVEDBYCOACH, MANAGERPENDING, INSTITUTEPENDING, APPROVEDBYATHLETE, APPROVEDBYCOACH, APPROVEDBYINSTITUTE, ATHLETEPENDING]
      }      
     },
      {       
      id_not_in:$athleteIds   
     },
      {athleteSports_some:   
        {    
          sport:{
            id_in: $sportId 
          }
          
        }
      }
     ]
    }
    ) 
     {    
      id
      status
      user 
      {      
      email     
      firstName
      lastName     
       }
      athleteSports{
        id
      }
      }
  }`

const NotificationData = compose(
  graphql(approveTeamMutation, {name: 'approveTeam'}),
  graphql(AthleteDataQuery, {name: 'athletesList'}, {
  options: (props) => ({ variables: { athleteIds: props.athleteIds } }),
}))(CoachInviteModal);


export default NotificationData;

