/*
 *
 * CoachHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import MenuItem from 'material-ui/MenuItem';
import H3 from 'components/H3';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import Dialog from 'material-ui/Dialog';
import NotificationModal from '../../containers/NotificationModal';
var _ = require('lodash');

export class CoachHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showNotificationDialog: false,
      activeIndex: 0,
      readNotifications: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let notificationsRead = []
    nextProps.data.allNotifications ? notificationsRead = _.groupBy(nextProps.data.allNotifications, {'isRead': true}) : ''
    this.setState({readNotifications: notificationsRead});
  }

  calculateTime(dateTime){
    let time = dateTime.toTimeString();
    let timeString = time.substring(0,9);
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = H < 12 ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    let date = dateTime.toDateString();
    let formattedDateTime = date + ', ' + timeString;
    return formattedDateTime;
  }

  toggleNotificationDialog(value, index) {
    this.setState({ showNotificationDialog: !value, activeIndex: index })
    console.log('index', index);
    this.props.data.refetch();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleNotificationDialog(this.state.showNotificationDialog)}
      />
    ];
    const{data}=this.props;
    return (
      <div>
        {data.allNotifications ? <div><Badge
            badgeContent={this.state.readNotifications.false ? this.state.readNotifications.false.length : data.allNotifications.length}
            secondary={true}
            badgeStyle={{top: 20, right: 25}}
            style={{"marginRight":"-40px"}}
          >
          <IconMenu maxHeight={200} autoWidth={true} iconButtonElement={
                <IconButton><NotificationsIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                {data.allNotifications.map((notification, index) => (
                  <MenuItem key={notification.id} onTouchTap={() => this.toggleNotificationDialog(this.state.showNotificationDialog, index)} primaryText={notification.title + ' at ' + this.calculateTime(new Date(notification.createdAt))} />))
                }
          </IconMenu>
           <Dialog
          title="Team Info"
          autoScrollBodyContent={true}
          actions={actions}
          modal={false}
          autoDetectWindowHeight={true}
          open={this.state.showNotificationDialog}
          onRequestClose={()=>this.toggleNotificationDialog(this.state.showNotificationDialog)}
        >
          <NotificationModal role={this.props.coachProfile.user ? this.props.coachProfile.user.role : ''} toggleNotificationDialog={(value)=>this.toggleNotificationDialog(value)} notification={data.allNotifications[this.state.activeIndex]} />
        </Dialog>
          </Badge>
          <Badge
            badgeContent={5}
            secondary={true}
            badgeStyle={{top: 20, right: 20}}
          >
            <IconButton>
              <EmailIcon />
            </IconButton>
          </Badge> </div> : ''}
      </div>
    );
  }
}

const coachQuery = gql`query coachQuery {
   user { id firstName lastName role
    athlete {
      id
    }
  }
}`

const CoachNotificationsQuery = gql`query CoachNotificationsQuery ($userId: ID) {
    allNotifications(orderBy: createdAt_DESC,filter: {user: {id: $userId}}) {
    id
    createdAt
    type
    typeId
    title
    isRead
  }
}`

const CoachHeaderData = compose(
graphql(coachQuery, {name: 'coachProfile'}),
graphql(CoachNotificationsQuery, {
  options: (props) => ({ pollInterval : 50000, variables: { userId: props.coachProfile.user ? props.coachProfile.user.id : localStorage.getItem('userID') } })
})
)(CoachHeader);

export default CoachHeaderData;

