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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import Dialog from 'material-ui/Dialog';
import NotificationModal from '../../containers/NotificationModal';

// export const CoachNotificationsContent = ({notificationsList, toggleNotificationDialog}) => (
//   <IconMenu maxHeight={200} autoWidth={true} iconButtonElement={
//                 <IconButton><NotificationsIcon /></IconButton>
//               }
//               targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
//               anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
//             >
//         {notificationsList.map(notification =>
//           <MenuItem key={notification.id} onTouchTap={() => toggleNotificationDialog(this.state.showInstituteForm)} primaryText={notification.title} />)
//         }
//   </IconMenu>
// )

export class CoachHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showNotificationDialog: false,
      activeIndex: 0
    }
  }

  toggleNotificationDialog(value, index) {
    this.setState({ showNotificationDialog: !value, activeIndex: index })
    console.log('index', index);
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
            badgeContent={data.allNotifications.length}
            secondary={true}
            badgeStyle={{top: 20, right: 25}}
            style={{"margin-right":"-40px"}}
          >
          <IconMenu maxHeight={200} autoWidth={true} iconButtonElement={
                <IconButton><NotificationsIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
                {data.allNotifications.map((notification, index) => (
                  <MenuItem key={notification.id} onTouchTap={() => this.toggleNotificationDialog(this.state.showNotificationDialog, index)} primaryText={notification.title} />))
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
          <NotificationModal toggleNotificationDialog={()=>this.toggleNotificationDialog()} notification={data.allNotifications[this.state.activeIndex]} />
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

const CoachNotificationsQuery = gql`query CoachNotificationsQuery ($userId: ID) {
    allNotifications(filter: {user: {id: $userId}}) {
    id
    type
    typeId
    title
    isRead
  }
}`

const CoachHeaderData = graphql(CoachNotificationsQuery, {
  options: { variables: { userId: localStorage.getItem('userID') } },
})(CoachHeader);

export default CoachHeaderData;

