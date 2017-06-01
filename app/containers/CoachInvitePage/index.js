/*
 *
 * CoachDashboard
 *
 */

import React, { PropTypes } from 'react';
import H3 from 'components/H3';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const style = {
  height: 200,
  width: 200,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export class CoachInvitePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <H3>Suggestions</H3>
        <Paper style={style} zDepth={1} />
        <Paper style={style} zDepth={1} />
        <Paper style={style} zDepth={1} />
      </div>
    );
  }
}

CoachInvitePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CoachInvitePage);
