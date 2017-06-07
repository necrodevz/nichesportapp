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
    return (
      <div>
        <div style={{"float": "left"}}>Institute Events Page</div>
        <div>
          {this.state.showEventForm ? <EventForm showEventForm={this.state.showEventForm} toggleEventForm={this.toggleEventForm}/> : <RaisedButton style={{"float": "right","margin-top": "10px","margin-right": "10px"}} label="Add New Event" onClick={() => this.toggleEventForm(this.state.showEventForm)} primary={true} />}
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
