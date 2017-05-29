/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import CenteredSection from '../../containers/HomePage/CenteredSection'
import { graphql } from 'react-apollo'
import {Tabs, Tab} from 'material-ui/Tabs';
import gql from 'graphql-tag'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
     const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <MuiThemeProvider>
       <Tabs>
            <Tab label="LogIn" >
              <LoginForm />
            </Tab>
            <Tab label="SignUp" >
            <SignUpForm />
            </Tab>
          </Tabs>
      </MuiThemeProvider>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  LoginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default LoginPage;
