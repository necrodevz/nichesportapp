/*
 *
 * OrganiseMatch
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
import SemiFinalForm from './SemiFinalForm'

const errors = {}

// validation functions
const required = value => (value == null ? 'Required' : undefined);
// const coach_email = value =>
//   (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email'
//     : undefined);

const validate = values => {
  errors.poolA = required(values.poolA)
  errors.poolB = required(values.poolB)
  // errors.coach_email = coach_email(values.coach_email || '')
  // if (!values.coach_email) {
  //   errors.coach_email = 'Required'
  // } else if (coach_email(values.coach_email)) {
  //   errors.coach_email = 'Invalid Email'
  // }
  return errors
}

export class OrganiseMatch extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      poolA: [],
      poolB: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let poolA =[];
    let poolB=[];
    console.log('this.props', this.props);
    nextProps.data.allEventDates.map((event,index)=>{
      console.log('111111', event);
      if(event.matchType == 'POOLA') {
        poolA.push({'id': event.teamA.id, 'name': event.teamA.name, 'date': event.date})
        poolA.push({'id': event.teamB.id, 'name': event.teamB.name, 'date': event.date})
      }
      else {
        poolB.push({'id': event.teamA.id, 'name': event.teamA.name, 'date': event.date})
        poolB.push({'id': event.teamB.id, 'name': event.teamB.name, 'date': event.date})
      }
    })
    this.setState({poolA: poolA, poolB: poolB});
  }

  render() {
    if (this.props.data.loading) {
    return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return (
      this.props.data.allEventDates.length > 0 ?
      <SemiFinalForm poolA={this.state.poolA} poolB={this.state.poolB} /> : <div>No Events Available To Organise Match</div>
    );
  }
}

const eventDetailsQuery = gql`query eventDetailsQuery ($eventId: ID){
   allEventDates(filter: { event:{ id: $eventId } }
  )
  {
    id teamA { id name } teamB { id name } matchType date
  }
}`

const createCoachMutation = gql`
  mutation createCoach ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $instituteId: ID!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, firstName: $firstName, lastName: $lastName, role: COACH, coach: {instituteId: $instituteId}) {
    id
  }
  }
`

const OrganiseMatchMutation = compose(
  graphql(eventDetailsQuery,{
  options: (props) => ({
      variables: {
        eventId: props.activeTeam.id }
    })
  }),
  graphql(createCoachMutation, {name: 'createCoach'})
)(OrganiseMatch)

export default OrganiseMatchMutation;

