/*
 *
 * CoachDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class CoachSearch extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{"height":"400px"}}>
      Search
      </div>
    );
  }
}

CoachSearch.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CoachSearch);
