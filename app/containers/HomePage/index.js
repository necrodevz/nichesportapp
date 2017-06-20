/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import H3 from 'components/H3';
import CenteredSection from './CenteredSection';
import Section from './Section';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Loading from 'components/LoadingIndicator';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.updateProfile = this.updateProfile.bind(this);
  }

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      User: React.PropTypes.object,
    }).isRequired,
  }

  componentWillReceiveProps(nextProps) {
    nextProps.data.user ? this.updateProfile(nextProps) : '';
  }

  updateProfile(nextProps) {
    localStorage.setItem('userID', nextProps.data.user.id);
    localStorage.setItem('userName', nextProps.data.user.firstName);
    localStorage.setItem('role', nextProps.data.user.role);
    nextProps.data.user.role == 'ADMIN' ? nextProps.GoToAdminDashboard(nextProps.data.user.role) : '';
    nextProps.data.user.role == 'ATHLETE' ? nextProps.GoToAthleteDashboard(nextProps.data.user.role) : '';
    nextProps.data.user.role == 'OWNER' ? nextProps.GoToInstituteDashboard(nextProps.data) : '';
    nextProps.data.user.role == 'COACH' ? nextProps.GoToCoachDashboard(nextProps.data.user.role) : '';
  }

  render() {
    if (this.props.data.loading) {
    return (<Loading />)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }

    return (
      <article>
          <CenteredSection>
            <H3>Welcome to NicheSportsApp, {this.props.data.user ? this.props.data.user.email : 'no Data'}.</H3>
          </CenteredSection>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ])
};

export function mapDispatchToProps(dispatch) {
  return {
    GoToAdminDashboard: (role) => dispatch((push({pathname: `/adminDashboard`, state: {role: role}}))),
    GoToInstituteDashboard: (data) => dispatch((push({pathname: `/instituteDashboard`, state: {role: data.user ? data.user.role : '', instituteId: data.user ? data.user.instituteOwner.id : '' }}))),
    GoToAthleteDashboard: (role) => dispatch((push({pathname: `/athleteDashboard`, state: {role: role}}))),
    GoToCoachDashboard: (role) => dispatch((push({pathname: `/coachDashboard`, state: {role: role}})))
  };
}

const UserQuery = gql`query UserQuery {
   user { id email firstName lastName role mobileNumber address profileImage bio nationality country timeZone dob gender height weight
    isActive isFirstTimeLogin mobileVerified emailVerified messageCount notificationCount instituteOwner {
      id
    }
  }
}`

const HomePageWithData = graphql(UserQuery)(HomePage);

export default connect(null, mapDispatchToProps)(HomePageWithData);
