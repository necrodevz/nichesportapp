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

export class AthleteHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Badge
            badgeContent={10}
            secondary={true}
            badgeStyle={{top: 2, right: 2}}
          >
            <IconMenu anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
              iconButtonElement={
                <IconButton><NotificationsIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
            </IconMenu>
          </Badge>
          <Badge
            badgeContent={5}
            secondary={true}
            badgeStyle={{top: 2, right: 2}}
          >
            <IconButton tooltip="Messages">
              <EmailIcon />
            </IconButton>
          </Badge>
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

export default connect(null, mapDispatchToProps)(AthleteHeader);
