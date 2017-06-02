/*
 *
 * NotificationModal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import RaisedButton from 'material-ui/RaisedButton';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import Notifications, {notify} from 'react-notify-toast';


export class NotificationModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    approveTeam: React.PropTypes.func,
    rejectTeam: React.PropTypes.func,
  }

  approveTeam = async (index) => {
    await this.props.approveTeam({variables: {notificationId: this.props.notification.typeId}
                 }).then(()=>location.reload()).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  rejectTeam = async (index) => {
    await this.props.rejectTeam({variables: {notificationId: this.props.notification.typeId}
                 }).then(()=>location.reload()).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const{notification, data}=this.props;
    const team = this.props.data.AtheletTeam ?  data.AtheletTeam.team : '';
    return (
      this.props.data.AtheletTeam ? <CenteredSection>
      <Notifications />
            <h3>Team Name: {team.name}</h3>
              <h4>
               <div>Age Group: {team.ageGroup}</div>
               <br/>
               <div>Sport: {team.sport ? team.sport.name : 'Not Available'}</div>
               <br/>
               <div>No. of Players: {team.totalNumberOfAthelets}</div>
               <br/>
              </h4>
              <div>
              <RaisedButton label="Approve" onTouchTap={()=>this.approveTeam()} primary={true} />
              <RaisedButton label="Reject" onTouchTap={()=>this.rejectTeam()} secondary={true} />
              </div>
            </CenteredSection> : <div>Loading</div>
    );
  }
}


const approveTeamMutation = gql`
  mutation approveTeam ($notificationId: ID!){
    updateAtheletTeam(id: $notificationId, status: APPROVEDBYCOACH)
  {
    id
  }
  }
`

const rejectTeamMutation = gql`
  mutation rejectTeam ($notificationId: ID!){
   updateAtheletTeam(id: $notificationId, status: REJECTEDBYCOACH)
  {
    id
  }
  }
`

const NotificationDataQuery = gql`query NotificationDataQuery ($notificationId: ID) {
  AtheletTeam(id: $notificationId){
  team{
    id
    name
    season
    ageGroup
    totalNumberOfAthelets
    approvedNumberOfAthelets
    atheletTeams {
      id
      status
      athleteMessage
      athlete{
        user{
          email
          firstName
          lastName
        }
      }
    }
    createdAt
    sport { id name }
    coach { id user { id email firstName lastName }}
    manager { id user { id email firstName lastName }}
  }    
  }
}`

const NotificationData = compose(
  graphql(approveTeamMutation, {name: 'approveTeam'}),
  graphql(rejectTeamMutation, {name: 'rejectTeam'}),
  graphql(NotificationDataQuery, {
  options: (props) => ({ variables: { notificationId: props.notification.typeId } }),
}))(NotificationModal);


export default NotificationData;

