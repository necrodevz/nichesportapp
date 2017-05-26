import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import { createInstitute } from '../DashboardPage/actions';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
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
import Notifications, {notify} from 'react-notify-toast';

var userID = localStorage.getItem('userID');

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const coach_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class CoachForm extends Component {
  static propTypes = {
    createCoach: React.PropTypes.func
  }

   submitCoachForm = async () => {
    await this.props.createCoach({variables: {firstName: this.props.FirstName,
                    lastName: this.props.LastName,
                    email: this.props.Email,
                    instituteId: userID, 
                   password: this.props.Password }
                 }).then(()=>location.reload()).catch((res)=>alert(JSON.stringify(res.message)))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="coach_first_name"
            component={TextField}
            hintText="First Name"
            floatingLabelText="First Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="coach_last_name"
            component={TextField}
            hintText="Last Name"
            floatingLabelText="Last Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="coach_email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, coach_email]}
          />
        </div>
        <div>
          <Field
            name="coach_password"
            component={TextField}
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            validate={required}
          />
        </div>
        <div>
          <RaisedButton label="Submit" disabled={submitting} onTouchTap={()=>this.submitCoachForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('coach_form');

CoachForm = connect(state => ({
  FirstName: selector(state, 'coach_first_name'),
  LastName: selector(state, 'coach_last_name'),
  Email: selector(state, 'coach_email'),
  Password: selector(state, 'coach_password')
}))(CoachForm);

CoachForm = reduxForm({
  form: 'coach_form',
})(CoachForm);


CoachForm.propTypes = {
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

const createCoachMutation = gql`
  mutation createCoach ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, firstName: $firstName, lastName: $lastName, role: COACH, coach: {instituteId: "cj32wbdg7mg3a01460zdkcxoi"}) {
    id
  }
  }
`

const TeamFormMutation = graphql(createCoachMutation, {name: 'createCoach'})(CoachForm)

export default TeamFormMutation;
