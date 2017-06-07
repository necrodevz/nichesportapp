/*
 *
 * AthleteHeader
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Badge from 'material-ui/Badge';
import MenuItem from 'material-ui/MenuItem';
import H3 from 'components/H3';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import NotificationModal from '../../containers/NotificationModal';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar'



export class AthleteHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        {data.allNotifications ?
          <div>
            <Avatar style={{"margin-top":"-15px"}} size={40} src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Kapil_Dev_at_Equation_sports_auction.jpg" />
            <Badge
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
            <IconButton tooltip="Messages">
              <EmailIcon />
            </IconButton>
          </Badge> </div> : ''}
      </div>
    );
  }
}

AthleteHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const AthleteNotificationsQuery = gql`query AthleteNotificationsQuery ($userId: ID) {
    allNotifications(filter: {user: {id: $userId}}) {
    id
    type
    typeId
    title
    isRead
  }
}`

const AthleteHeaderData = graphql(AthleteNotificationsQuery, {
  options: { variables: { userId: localStorage.getItem('userID') } },
})(AthleteHeader);

export default AthleteHeaderData;
