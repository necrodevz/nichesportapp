/*
 *
 * SemiFinalForm
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import {
  SelectField
} from 'redux-form-material-ui';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Notifications, {notify} from 'react-notify-toast';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {GridList, GridTile} from 'material-ui/GridList';

const errors = {}

// validation functions
const required = value => (value == null ? 'Required' : undefined);
// const coach_email = value =>
//   (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email'
//     : undefined);

const validate = values => {
  errors.poolA = required(values.poolATeams)
  errors.poolB = required(values.poolBTeams)
  // errors.coach_email = coach_email(values.coach_email || '')
  // if (!values.coach_email) {
  //   errors.coach_email = 'Required'
  // } else if (coach_email(values.coach_email)) {
  //   errors.coach_email = 'Invalid Email'
  // }
  return errors
}

export class SemiFinalForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    console.log('22222', props);
  }

  static propTypes = {
    createSemiFinal: React.PropTypes.func
  }

  submitSemiFinalForm = async () => {
    await this.props.createSemiFinal({variables: {firstName: this.props.FirstName,
                    lastName: this.props.LastName,
                    email: this.props.Email,
                    instituteId: this.props.instituteId,
                   password: this.props.Password }
                 }).then(()=>location.reload()).then(()=>notify.show('Coach Created Successfully', 'success')).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;

    return (
      this.props.poolA.length > 0 && this.props.poolB.length > 0 ? <form onSubmit={handleSubmit}>
            <GridList cols={2} cellHeight={90} padding={1}>
              <GridTile>
                <Field
                  name="poolATeams"
                  multiple={true}
                  component={SelectField}
                  hintText="Select Pool A Teams"
                  floatingLabelText="Select Pool A Teams"
                  validate={required}
                >
              {this.props.poolA.map(type => (<MenuItem value={type.id} primaryText={type.name} key={type.id} />))}
                </Field>
                </GridTile>
                </GridList>
            <GridList cols={2} cellHeight={90} padding={1}>
              <GridTile>
                <Field
                  name="poolBTeams"
                  multiple={true}
                  component={SelectField}
                  hintText="Select Pool B Teams"
                  floatingLabelText="Select Pool B Teams"
                  validate={required}
                >
              {this.props.poolB.map(type => (<MenuItem value={type.id} primaryText={type.name} key={type.id} />))}
                </Field>
                </GridTile>
            </GridList>
            <GridList cols={1} cellHeight={80} padding={1}>
              <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
                <RaisedButton label="Submit" disabled={errors.poolA != null || errors.poolB != null} onTouchTap={()=>this.submitSemiFinalForm()} primary={true} />
              </GridTile>
            </GridList>
            </form> : <div>Inavlid Teams Data</div>
    );
  }
}

const selector = formValueSelector('semiFinalMatchesForm');

SemiFinalForm = connect(state => ({
  poolATeams: selector(state, 'poolATeams'),
  poolBTeams: selector(state, 'poolBTeams')
}))(SemiFinalForm);

SemiFinalForm = reduxForm({
  form: 'semiFinalMatchesForm',
  validate
})(SemiFinalForm);

const createSemiFinalMutation = gql`
  mutation createSemiFinal ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $instituteId: ID!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, firstName: $firstName, lastName: $lastName, role: COACH, coach: {instituteId: $instituteId}) {
    id
  }
  }
`

const SemiFinalFormMutation = compose(
  graphql(createSemiFinalMutation, {name: 'createSemiFinal'})
)(SemiFinalForm)

export default SemiFinalFormMutation;

