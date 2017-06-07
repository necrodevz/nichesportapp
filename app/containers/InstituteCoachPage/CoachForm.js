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
import {GridList, GridTile} from 'material-ui/GridList';


var userID = localStorage.getItem('userID');
const errors = {}

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const coach_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

const validate = values => {
  errors.coach_first_name = required(values.coach_first_name)
  errors.coach_last_name = required(values.coach_last_name)
  errors.coach_password = required(values.coach_password)
  errors.coach_email = coach_email(values.coach_email || '')
  if (!values.coach_email) {
    errors.coach_email = 'Required'
  } else if (coach_email(values.coach_email)) {
    errors.coach_email = 'Invalid Email'
  }
  return errors
}

class CoachForm extends Component {
  static propTypes = {
    createCoach: React.PropTypes.func
  }

   submitCoachForm = async () => {
    console.log("erorrrr",errors)
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
      <GridList cols={2} cellHeight={80} padding={1}>
        <GridTile>
          <Field
            name="coach_first_name"
            component={TextField}
            hintText="First Name"
            floatingLabelText="First Name"
            validate={required}
          />
        </GridTile>
        <GridTile>
          <Field
            name="coach_last_name"
            component={TextField}
            hintText="Last Name"
            floatingLabelText="Last Name"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={2} cellHeight={80} padding={1}>
        <GridTile>
          <Field
            name="coach_email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, coach_email]}
          />
        </GridTile>
        <GridTile>
          <Field
            name="coach_password"
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
          <RaisedButton label="Submit" disabled={errors.coach_last_name != null || errors.coach_first_name != null || errors.coach_email != null || errors.coach_password != null || submitting} onTouchTap={()=>this.submitCoachForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </GridTile>
      </GridList>
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
  validate
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
