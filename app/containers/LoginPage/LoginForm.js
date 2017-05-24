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

const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class LoginForm extends Component {
  static propTypes = {
    addPost: React.PropTypes.func
  }

   submitLoginForm = async () => {
    await this.props.addPost({variables: {name: this.props.FirstName,
                    lastName: this.props.LastName,
                    status: "ACTIVE",
                   ownerId: "cj2q1u2hg5yvq0175zo5ymafv" }
                 }).then(()=>console.log('form submitted------'))
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
       <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="coach_email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, email]}
          />
        </div>
        <div>
          <Field
            name="event_name"
            component={TextField}
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            validate={required}
          />
        </div>
        <div>
          <RaisedButton label="LogIn" disabled={pristine || submitting} primary={true} />
          <RaisedButton label="SignUp" disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('login_form');

LoginForm = connect(state => ({
  FirstName: selector(state, 'event_name'),
  lastNameame: selector(state, 'sport')
}))(LoginForm);

LoginForm = reduxForm({
  form: 'login_form',
})(LoginForm);


LoginForm.propTypes = {
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

export default LoginForm;
