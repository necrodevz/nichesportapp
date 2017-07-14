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
import {removeExtraChar} from '../Global/GlobalFun';

const errors = {}

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const poolATeams = value =>
  (value ? (value.length != 2
    ? 'Please Select Only 2 Teams'
    : undefined) : '');

const poolBTeams = value =>
  (value ? (value.length != 2
    ? 'Please Select Only 2 Teams'
    : undefined) : '');

const validate = values => {
  errors.poolATeams = required(values.poolATeams || '')
  if (!values.poolATeams) {
    errors.poolATeams = 'Required'
  } else if (poolATeams(values.poolATeams)) {
    errors.poolATeams = 'Please Select Only 2 Teams'
  }
  errors.poolBTeams = required(values.poolBTeams || '')
  if (!values.poolBTeams) {
    errors.poolBTeams = 'Required'
  } else if (poolBTeams(values.poolBTeams)) {
    errors.poolBTeams = 'Please Select Only 2 Teams'
  }
  return errors
}

export class SemiFinalForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  static propTypes = {
    createSemiFinal: React.PropTypes.func
  }

  submitSemiFinalForm = async () => {
    const{ eventId, maxDate, poolATeams, poolBTeams } = this.props;
    var matchDate= new Date();
    matchDate = new Date(matchDate.setDate(maxDate.getDate()+3));
    await this.props.createSemiFinal({variables: {eventId: eventId,
                    teamAId: poolATeams[0],
                    teamBId: poolBTeams[0],
                    date: matchDate,
                    type: "SEMIFINAL"
                   }
                 }).then(()=>this.props.createSemiFinal({variables: {eventId: eventId,
                    teamAId: poolATeams[1],
                    teamBId: poolBTeams[1],
                    date: matchDate,
                    type: "SEMIFINAL"
                   }
                 })).then(()=>notify.show('SemiFinal Matches Created Successfully', 'success')).then(()=>this.props.toggleEventDetailDialog('false')).catch((res)=>notify.show(removeExtraChar(res), 'error'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;

    return (
      this.props.poolA.length > 0 && this.props.poolB.length > 0 ? <form onSubmit={handleSubmit}>
            <Notifications />
            <GridList cols={2} cellHeight={90} padding={1}>
              <GridTile>
                <Field
                  name="poolATeams"
                  multiple={true}
                  component={SelectField}
                  maxHeight={200}
                  errorText={errors.poolATeams}
                  hintText="Select Pool A Teams"
                  floatingLabelText="Select Pool A Teams"
                  validate={poolATeams}
                >
              {this.props.poolA.map((team, index) => (<MenuItem value={team.id} primaryText={team.name} key={team.id} />))}
                </Field>
                </GridTile>
                </GridList>
            <GridList cols={2} cellHeight={90} padding={1}>
              <GridTile>
                <Field
                  name="poolBTeams"
                  multiple={true}
                  errorText={errors.poolBTeams}
                  maxHeight={200}
                  component={SelectField}
                  hintText="Select Pool B Teams"
                  floatingLabelText="Select Pool B Teams"
                  validate={poolBTeams}
                >
              {this.props.poolB.map((team, index) => (<MenuItem value={team.id} primaryText={team.name} key={team.id} />))}
                </Field>
                </GridTile>
            </GridList>
            <GridList cols={1} cellHeight={90} padding={1}>
              <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
                <RaisedButton label="Submit" disabled={errors.poolATeams != null || errors.poolBTeams != null} onTouchTap={()=>this.submitSemiFinalForm()} primary={true} />
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
  mutation createSemiFinal ($eventId: ID!, $teamAId: ID!, $teamBId: ID!, $date: DateTime!, $type: EVENT_DATE_MATCH_TYPE!) {
    createEventDate( 
    eventId: $eventId
    teamAId: $teamAId
    teamBId: $teamBId
    matchType: $type
    date: $date
  ){ id }
  }
`

const SemiFinalFormMutation = compose(
  graphql(createSemiFinalMutation, {name: 'createSemiFinal'})
)(SemiFinalForm)

export default SemiFinalFormMutation;

