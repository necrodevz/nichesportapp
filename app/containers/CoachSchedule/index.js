/*
 *
 * CoachDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoachTeam from '../../containers/CoachTeam';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';

const style = {
  margin: 12,
  align: 'right',
};

export class CoachSchedule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      open : false
    }
  }

  handleOpen = () => {
    console.log("aayaa in open")
    this.setState({open: true});
  };

  handleClose = () => {
    console.log("aayaa in close")
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
      <RaisedButton label="Add New Team" onTouchTap={this.handleOpen} primary={true} />
       <Dialog
          title="Training"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <form>
  <label>
    Training Session:<input type="text" name="name" />
  </label><br/>
  <label>
    Dates:<input type="text" name="name" />
  </label><br/>
  <label>
    Time:<input type="text" name="name" />
  </label><br/>
   <label>
    Select Team:<input type="text" name="name" />
  </label><br/>
   <label>
    Address:<input type="text" name="name" />
  </label><br/>
</form>
        </Dialog>
       <Card>
        <CardHeader
          title="Training"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title="Event"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
    </Card>
      </div>
    );
  }
}

CoachSchedule.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CoachSchedule);
