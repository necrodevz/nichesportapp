/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes as T } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import H3 from 'components/H3';
import CenteredSection from './CenteredSection';
import Section from './Section';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AuthService from '../../auth-session/src/auth-utils/AuthService' 

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
   
   static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props) {
    super(props)
    console.log(localStorage.getItem('profile'));
  }

 logout(){
    localStorage.removeItem('id_token');
     localStorage.removeItem('profile');
    this.props.router.push('/login');
  }

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      User: React.PropTypes.object,
    }).isRequired,
  }

  adminDashboardClick() {
    this.props.GoToAdminDashboard();
  }

  instituteDashboardClick() {
    this.props.GoToInstituteDashboard();
  }

  athleteDashboardClick() {
    this.props.GoToAthleteDashboard();
  }

  render() {
    if (this.props.data.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }

    return (
      <MuiThemeProvider>
      <article>
        <div>
          <CenteredSection>
            <RaisedButton label="Logout Dashboard" onClick={this.logout.bind(this)} secondary={true} />
            <H3>Hey , there are {this.props.data.allUsers.length} Players in your account</H3>
          </CenteredSection>
          <Section>
          <CenteredSection>
              <RaisedButton label="Proceed to Admin Dashboard" onClick={()=>this.adminDashboardClick()} primary={true} />
              <RaisedButton label="Proceed to Institute Dashboard" onClick={()=>this.instituteDashboardClick()} primary={true} />
              <RaisedButton label="Proceed to Athlete Dashboard" onClick={()=>this.athleteDashboardClick()} primary={true} />
          </CenteredSection>
          </Section>
        </div>
      </article>
      </MuiThemeProvider>
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
    GoToAdminDashboard: () => dispatch(push('/adminDashboard')),
    GoToInstituteDashboard: () => dispatch(push('/instituteDashboard')),
    GoToAthleteDashboard: () => dispatch(push('/athleteDashboard'))
  };
}

const mapStateToProps = createStructuredSelector({
});

const UserQuery = gql`query UserQuery {
  allUsers {
    email
  }
}`

const PokedexWithData = graphql(UserQuery)(HomePage);

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PokedexWithData);
