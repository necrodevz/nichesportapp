/*
 *
 * InstituteCalendar
 *
 */

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux';
import EventForm from './EventForm';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class InstituteCalendar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showEventForm: false
    }
  }

  toggleEventForm(value) {
    console.log('value', value);
      this.setState({ showEventForm: !value })
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleEventForm(this.state.showEventForm)}
      />
    ];


    return (
      <div>
        <div style={{"float": "left","height":"400px"}} >Institute Events Page</div>
        <div>
          {this.state.showEventForm ? 
            <Dialog
                title="Create Event"
                autoScrollBodyContent={true}
                actions={actions}
                modal={false}
                titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
                open={this.state.showEventForm}
                onRequestClose={()=>this.toggleEventForm(this.state.showEventForm)}
              >
                <EventForm showEventForm={this.state.showEventForm} toggleEventForm={this.toggleEventForm}/> 
            </Dialog>
            : <RaisedButton style={{"float": "right","marginTop": "10px","marginRight": "10px"}} label="Add New Event" onClick={() => this.toggleEventForm(this.state.showEventForm)} primary={true} />}
        </div>
      </div>
    );
  }
}

InstituteCalendar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(InstituteCalendar);
