/*
 *
 * AthleteProfile
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import H2 from 'components/H2';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import FontIcon from 'material-ui/FontIcon';
import AthleteProfileForm from './AthleteProfileForm'

export class AthleteProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <CenteredSection>
      <H2>My Profile</H2>
       <AthleteProfileForm />
      </CenteredSection>
    );
  }
}

AthleteProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AthleteProfile);
