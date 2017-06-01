/*
 *
 * CoachDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class CoachVideo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      Video
      </div>
    );
  }
}

CoachVideo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CoachVideo);
