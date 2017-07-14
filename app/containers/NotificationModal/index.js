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
import Loading from 'components/LoadingIndicator';
import {removeExtraChar} from '../Global/GlobalFun';
const userRole = localStorage.getItem('role');

export class NotificationModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    approveTeam: React.PropTypes.func,
    rejectTeam: React.PropTypes.func,
    updateNotification: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.updateNotification({ variables : { notificationId: this.props.notification.id }})
  }

  approveTeam = async (index) => {
    await this.props.approveTeam({variables: {notificationId: this.props.notification.typeId,
      status: `APPROVEDBY`+`${userRole}`}
                 }).then(()=>notify.show('Approved', 'success')).then(()=>this.props.toggleNotificationDialog('false')).catch((res)=>alert(removeExtraChar(res)))
  }

  rejectTeam = async (index) => {
    await this.props.rejectTeam({variables: {notificationId: this.props.notification.typeId,
      status: `REJECTEDBY`+`${userRole}`}
                 }).then(()=>notify.show('Rejected', 'success')).then(()=>this.props.toggleNotificationDialog('false')).catch((res)=>alert(removeExtraChar(res)))
  }

  render() {
    const{notification, data}=this.props;
    const team = data.AtheletTeam ?  data.AtheletTeam.team : '';
    if (data.loading) {
      return (<Loading />)
    }

    if (data.error) {
      console.log(data.error)
      return (<div>An unexpected error occurred</div>)
    }
    return (
      data.AtheletTeam ? <CenteredSection>
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
            </CenteredSection> : <div>This Notification is Already Acknowledged</div>
    );
  }
}


const approveTeamMutation = gql`
  mutation approveTeam ($notificationId: ID!, $status: ATHELET_TEAM_STATUS){
    updateAtheletTeam(id: $notificationId, status: $status)
  {
    id
  }
  }
`

const rejectTeamMutation = gql`
  mutation rejectTeam ($notificationId: ID!, $status: ATHELET_TEAM_STATUS){
   updateAtheletTeam(id: $notificationId, status: $status)
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

const updateNotification = gql`
  mutation updateNotification ($notificationId: ID!){
    updateNotification(
    id: $notificationId
    isRead:true
  ){
    id
  }
  }
`

const NotificationData = compose(
  graphql(updateNotification, {name: 'updateNotification'}),
  graphql(approveTeamMutation, {name: 'approveTeam'}),
  graphql(rejectTeamMutation, {name: 'rejectTeam'}),
  graphql(NotificationDataQuery, {
  options: (props) => ({ variables: { notificationId: props.notification.typeId } }),
}))(NotificationModal);


export default NotificationData;

