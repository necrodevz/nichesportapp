/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes as T } from 'react'
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import H3 from 'components/H3';
import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// 
import AuthService from '../../auth-session/src/auth-utils/AuthService'
// 

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   
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

  LogInSubmit() {
    this.props.GoToDashboard();
  }

  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    if (this.props.data.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }

    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <MuiThemeProvider>
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <button onClick={this.logout.bind(this)}> Logout</button> <br />
            <H3>Hey , there are {this.props.data.allUsers.length} Players in your account</H3>
          </CenteredSection>
          <Section>
          <CenteredSection>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.startProjectMessage} />
                <Input
                  id="username"
                  type="text"
                  placeholder="enter your username"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
              <br/>
              <br/>
              <label htmlFor="password">
              <FormattedMessage {...messages.startProjectMessage} />
              <Input
                id="password"
                type="password"
                value={this.props.password}
                onChange={this.props.password}
              />
              </label>
              <br/>
              <br/>
              <RaisedButton label="LogIn/SignUp" onClick={()=>this.LogInSubmit()} primary={true} />
            </Form>
          </CenteredSection>
            <ReposList {...reposListProps} />
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
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    GoToDashboard: () => dispatch(push('/adminDashboard')),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError()
});

const UserQuery = gql`query UserQuery {
  allUsers {
    email
  }
}`

const PokedexWithData = graphql(UserQuery)(HomePage);

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PokedexWithData);
