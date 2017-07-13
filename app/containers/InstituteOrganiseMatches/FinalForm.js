/*
 *
 * FinalForm
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
const validate = values => {
  errors.poolATeams = required(values.poolATeams)
  errors.poolBTeams = required(values.poolBTeams)
  return errors
}

export class FinalForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
  }

  static propTypes = {
    createFinal: React.PropTypes.func
  }

  submitFinalForm = async () => {
    const{ eventId, maxDate, poolATeams, poolBTeams } = this.props;
    var matchDate= new Date();
    matchDate = new Date(matchDate.setDate(maxDate.getDate()+6));
    await this.props.createFinal({variables: {eventId: eventId,
                    teamAId: poolATeams,
                    teamBId: poolBTeams,
                    date: matchDate,
                    type: "FINAL"
                   }
                 }).then(()=>notify.show('Final Matches Created Successfully', 'success')).then(()=>this.props.toggleEventDetailDialog('false')).catch((res)=>notify.show(removeExtraChar(res), 'error'))
  }

  render() {
    
    const {loading, error, repos, handleSubmit, pristine, reset, submitting, semiFinalTeams} = this.props;

    return (
      semiFinalTeams.length > 0 ? <form onSubmit={handleSubmit}>
            <Notifications />
            <GridList cols={2} cellHeight={90} padding={1}>
              <GridTile>
                <Field
                  name="poolATeams"
                  component={SelectField}
                  maxHeight={200}
                  errorText={errors.poolATeams}
                  hintText="Select Pool A Teams"
                  floatingLabelText="Select Pool A Teams"
                  validate={required}
                >
              <MenuItem value={semiFinalTeams[0].id} primaryText={semiFinalTeams[0].name} key={semiFinalTeams[0].id} />
              <MenuItem value={semiFinalTeams[1].id} primaryText={semiFinalTeams[1].name} key={semiFinalTeams[1].id} />
                </Field>
                </GridTile>
                </GridList>
            <GridList cols={2} cellHeight={90} padding={1}>
              <GridTile>
                <Field
                  name="poolBTeams"
                  errorText={errors.poolBTeams}
                  maxHeight={200}
                  component={SelectField}
                  hintText="Select Pool B Teams"
                  floatingLabelText="Select Pool B Teams"
                  validate={required}
                >
              <MenuItem value={semiFinalTeams[2].id} primaryText={semiFinalTeams[2].name} key={semiFinalTeams[2].id} />
              <MenuItem value={semiFinalTeams[3].id} primaryText={semiFinalTeams[3].name} key={semiFinalTeams[3].id} />
                </Field>
                </GridTile>
            </GridList>
            <GridList cols={1} cellHeight={90} padding={1}>
              <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
                <RaisedButton label="Submit" disabled={errors.poolATeams != null || errors.poolBTeams != null} onTouchTap={()=>this.submitFinalForm()} primary={true} />
              </GridTile>
            </GridList>
            </form> : <div>Please Select SemiFinal Teams To Enable Finals</div>
    );
  }
}

const selector = formValueSelector('finalMatchesForm');

FinalForm = connect(state => ({
  poolATeams: selector(state, 'poolATeams'),
  poolBTeams: selector(state, 'poolBTeams')
}))(FinalForm);

FinalForm = reduxForm({
  form: 'finalMatchesForm',
  validate
})(FinalForm);

const createFinalMutation = gql`
  mutation createFinal ($eventId: ID!, $teamAId: ID!, $teamBId: ID!, $date: DateTime!, $type: EVENT_DATE_MATCH_TYPE!) {
    createEventDate( 
    eventId: $eventId
    teamAId: $teamAId
    teamBId: $teamBId
    matchType: $type
    date: $date
  ){ id }
  }
`

const FinalFormMutation = compose(
  graphql(createFinalMutation, {name: 'createFinal'})
)(FinalForm)

export default FinalFormMutation;

