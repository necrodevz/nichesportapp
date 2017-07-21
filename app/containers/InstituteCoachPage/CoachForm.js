import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {
  TextField
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Notifications, {notify} from 'react-notify-toast';
import {GridList, GridTile} from 'material-ui/GridList';
import {removeExtraChar} from '../Global/GlobalFun';


var userID = localStorage.getItem('userID');
const errors = {};

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
    await this.props.createCoach({variables: {firstName: this.props.FirstName,
                    lastName: this.props.LastName,
                    email: this.props.Email,
                    instituteId: this.props.instituteId,
                   password: this.props.Password }
                 }).then(()=>notify.show('Coach Created Successfully', 'success')).then(()=>this.props.data.refetch()).then(()=>this.props.toggleCoachForm('false')).catch((res)=>notify.show(removeExtraChar(res), 'error'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <Notifications />
      <GridList cols={2} cellHeight={90} padding={1}>
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
      <GridList cols={2} cellHeight={90} padding={1}>
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
      <GridList cols={1} cellHeight={90} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <RaisedButton label="Submit" disabled={errors.coach_last_name != null || errors.coach_first_name != null || errors.coach_email != null || errors.coach_password != null || submitting} onTouchTap={()=>this.submitCoachForm()} primary={true} />
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

const createCoachMutation = gql`
  mutation createCoach ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $instituteId: ID!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, firstName: $firstName, lastName: $lastName, role: COACH, coach: {instituteId: $instituteId}) {
    id
  }
  }
`

const TeamFormMutation = graphql(createCoachMutation, {name: 'createCoach'})(CoachForm)

export default TeamFormMutation;
