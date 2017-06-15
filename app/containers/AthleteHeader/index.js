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
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import NotificationModal from '../../containers/NotificationModal';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar'

const REFRESH_INTERVAL = 200 * 1000; //2 minutes

export class AthleteHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showNotificationDialog: false,
      activeIndex: 0
    }
  }

  componentDidMount() {
    this.refreshAthleteHeader = setInterval(() => {
        this.props.data.refetch();
        this.props.athleteProfile.refetch();
    }, REFRESH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.refreshAthleteHeader);
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

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div>
        {data.allNotifications ?
          <div>
            {this.props.athleteProfile.user.profileImage ? <Avatar style={{"marginTop":"-15px"}} size={50} src={this.props.athleteProfile.user.profileImage} /> : ''}
            <Badge
              badgeContent={data.allNotifications.length}
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const athleteQuery = gql`query athleteQuery {
   user { id firstName lastName profileImage
    athlete {
      id
    }
  }
}`


const AthleteNotificationsQuery = gql`query AthleteNotificationsQuery ($userId: ID) {
    allNotifications(filter: {user: {id: $userId}}) {
    id
    type
    typeId
    title
    isRead
  }
}`

const AthleteHeaderData = compose(
graphql(athleteQuery, {name: 'athleteProfile'}),
graphql(AthleteNotificationsQuery, {
  options: (props) => ({ variables: { userId: props.athleteProfile.user ? props.athleteProfile.user.id : localStorage.getItem('userID') } })
}))(AthleteHeader);

export default AthleteHeaderData;
