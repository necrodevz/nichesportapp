/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import {Tabs, Tab} from 'material-ui/Tabs';
import gql from 'graphql-tag';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
     const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <div style={{"marginTop":"50px","marginBotton":"30px"}}>
        <MuiThemeProvider>
          <div className="login-signin-form">
            <Tabs >
              <Tab label="LogIn" >
                <LoginForm />
              </Tab>
              <Tab label="SignUp" >
              <SignUpForm />
              </Tab>
            </Tabs>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginPage;
