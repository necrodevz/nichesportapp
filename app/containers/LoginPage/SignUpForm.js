import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
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
import gql from 'graphql-tag'
import { push } from 'react-router-redux';
import Notifications, {notify} from 'react-notify-toast';
import {GridList, GridTile} from 'material-ui/GridList';

const errors = {}

const required = value => (value == null ? 'Required' : undefined);
const signup_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

const validateSignup = values => {
  
  errors.first_name = required(values.first_name)
  errors.last_name = required(values.last_name)
  errors.signup_password = required(values.signup_password)
  errors.signup_email = signup_email(values.signup_email || '')
  if (!values.signup_email) {
    errors.signup_email = 'Required'
  } else if (signup_email(values.signup_email)) {
    errors.signup_email = 'Invalid Email'
  }
  return errors
}


class SignUpForm extends Component {
  static propTypes = {
    SignUpAthlete: React.PropTypes.func
  }

   submitSignUpForm = async () => {
    await this.props.SignUpAthlete({variables: {firstName: this.props.FirstName,
                    lastName: this.props.LastName,
                    email: this.props.Email,
                   password: this.props.Password}
                 }).then(()=> this.props.GoToLogin()).then(()=>location.reload()).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <CenteredSection>
       <form onSubmit={handleSubmit}>
      <GridList cols={1} cellHeight={110} padding={1}>
        <GridTile>
          <Field
            name="first_name"
            component={TextField}
            hintText="First Name"
            floatingLabelText="First Name"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={110} padding={1}>
        <GridTile>
          <Field
            name="last_name"
            component={TextField}
            hintText="Last Name"
            floatingLabelText="Last Name"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={110} padding={1}>
        <GridTile>
          <Field
            name="signup_email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, signup_email]}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={110} padding={5}>
        <GridTile>
          <Field
            name="signup_password"
            component={TextField}
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={80} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <RaisedButton style={{"margin-right":"20px"}} label="Submit" disabled={errors.signup_email != null || errors.signup_password != null || errors.first_name != null || errors.last_name != null} onClick={()=>this.submitSignUpForm()} primary={true} />
        </GridTile>
      </GridList>
      </form>
      </CenteredSection>
    );
  }
}

const selector = formValueSelector('signup_form');

SignUpForm = reduxForm({
  form: 'signup_form',
  validate: validateSignup
})(SignUpForm);


SignUpForm = connect(state => ({
  FirstName: selector(state, 'first_name'),
  LastName: selector(state, 'last_name'),
  Email: selector(state, 'signup_email'),
  Password: selector(state, 'signup_password')
}))(SignUpForm);

export function mapDispatchToProps(dispatch) {
  return {
    GoToLogin: () => dispatch(push('/login'))
  };
}


const addMutation = gql`
  mutation SignUpAthlete ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(authProvider: {
    email: {email: $email, password: $password}
  }, firstName: $firstName, lastName: $lastName, role: ATHLETE, athlete: {}) {
    id
}
}
`

const SignUpMutation = graphql(addMutation, {name: 'SignUpAthlete'})(SignUpForm)

export default connect (null, mapDispatchToProps)(SignUpMutation);
