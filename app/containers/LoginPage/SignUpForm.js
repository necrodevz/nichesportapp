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

const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class SignUpForm extends Component {
  static propTypes = {
    SignUpAthlete: React.PropTypes.func
  }

   submitSignUpForm = async () => {
    await this.props.SignUpAthlete({variables: {firstName: this.props.FirstName,
                    lastName: this.props.LastName,
                    email: this.props.Email,
                   password: this.props.Password}
                 }).then((res)=>localStorage.setItem('token', res.data.createUser.token)).then(()=> this.props.GoToHome()).then(()=>location.reload())
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <CenteredSection>
       <form onSubmit={handleSubmit}>
       <div>
          <Field
            name="first_name"
            component={TextField}
            hintText="First Name"
            floatingLabelText="First Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="last_name"
            component={TextField}
            hintText="Last Name"
            floatingLabelText="Last Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, email]}
          />
        </div>
        <div>
          <Field
            name="password"
            component={TextField}
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            validate={required}
          />
        </div>
        <div>
          <RaisedButton label="Submit" onClick={()=>this.submitSignUpForm()} disabled={submitting} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
      </CenteredSection>
    );
  }
}

const selector = formValueSelector('login_form');

SignUpForm = connect(state => ({
  FirstName: selector(state, 'first_name'),
  LastName: selector(state, 'last_name'),
  Email: selector(state, 'email'),
  Password: selector(state, 'password')
}))(SignUpForm);

SignUpForm = reduxForm({
  form: 'login_form',
})(SignUpForm);


SignUpForm.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  coach: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    GoToHome: () => dispatch(push('/'))
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
