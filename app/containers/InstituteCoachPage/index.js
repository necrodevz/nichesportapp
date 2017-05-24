/*
 *
 * InstituteCoachPage
 *
 */

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux';
import CoachForm from './CoachForm';
import CenteredSection from '../../containers/HomePage/CenteredSection';

export class InstituteCoachPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showCoachForm: false
    }
  }

  toggleCoachForm(value) {
    console.log('value', value);
      this.setState({ showCoachForm: !value })
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return true;
  }
  render() {
    return (
      <CenteredSection>
      Institute Coach Page
      {this.state.showCoachForm ? <CoachForm showCoachForm={this.state.showCoachForm} toggleCoachForm={this.toggleCoachForm}/> : <RaisedButton label="Add New Coach" onClick={() => this.toggleCoachForm(this.state.showCoachForm)} primary={true} />}
      </CenteredSection>
    );
  }
}

InstituteCoachPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(InstituteCoachPage);
