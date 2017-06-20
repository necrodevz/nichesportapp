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
import SemiFinalForm from './SemiFinalForm';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Chip from 'material-ui/Chip';
import H3 from 'components/H3';
var _ = require('lodash');
import FinalForm from './FinalForm';
import Loading from 'components/LoadingIndicator';

const style = {
  margin: 20,
  textAlign: 'center'
};

export class OrganiseMatch extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      poolA: [],
      poolB: [],
      semiFinalTeams: [],
      finalTeams: [],
      maxDate: new Date(),
      semiFinalExists: false,
      finalExists: false
    }
  }

  componentDidMount() {
    this.props.data.refetch();
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    let poolA =[];
    let poolB=[];
    let semiFinalTeams=[];
    let finalTeams=[];
    let dates = [];
    let semiFinalExists = _.some(nextProps.data.allEventDates, { 'matchType': 'SEMIFINAL' });
    let finalExists = _.some(nextProps.data.allEventDates, { 'matchType': 'FINAL' });
    console.log('this.props', this.props);
    nextProps.data.allEventDates.map((event,index)=>{
      dates.push(new Date(event.date))
      if(event.matchType == 'POOLA') {
        poolA.push({'id': event.teamA.id, 'name': event.teamA.name, 'date': event.date})
        poolA.push({'id': event.teamB.id, 'name': event.teamB.name, 'date': event.date})
      }
      else if(event.matchType == 'POOLB') {
        poolB.push({'id': event.teamA.id, 'name': event.teamA.name, 'date': event.date})
        poolB.push({'id': event.teamB.id, 'name': event.teamB.name, 'date': event.date})
      }
      else if(event.matchType == 'SEMIFINAL') {
        semiFinalTeams.push({'id': event.teamA.id, 'name': event.teamA.name, 'date': event.date})
        semiFinalTeams.push({'id': event.teamB.id, 'name': event.teamB.name, 'date': event.date})
      }
      else if(event.matchType == 'FINAL') {
        finalTeams.push({'id': event.teamA.id, 'name': event.teamA.name, 'date': event.date})
        finalTeams.push({'id': event.teamB.id, 'name': event.teamB.name, 'date': event.date})
      }
    })
    let maxDate = new Date(Math.max.apply(null,dates));
    this.setState({poolA: poolA, poolB: poolB, maxDate: maxDate, semiFinalExists: semiFinalExists, finalExists: finalExists,
     semiFinalTeams: semiFinalTeams, finalTeams: finalTeams});
  }

  render() {
    if (this.props.data.loading) {
    return (<Loading />)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    return (
      this.props.data.allEventDates.length > 0 ?
      <div>
      <Paper style={style} zDepth={2}>
      <H3>Pool A Teams</H3>
      {this.state.poolA.map((team, index)=>(<span key={index}>
          #{index+1} {team.name}
          &nbsp;
          &nbsp;
      </span>
      ))
      }
      </Paper>
      <Paper style={style} zDepth={2}>
      <H3>Pool B Teams</H3>
      {this.state.poolB.map((team, index)=>(<span key={index}>
          #{index+1} {team.name}
          &nbsp;
          &nbsp;
      </span>
      ))
      }
      </Paper>
      <Paper style={style} zDepth={2}>
      <H3>Semi Finals</H3>
      {this.state.semiFinalExists ?
      <span>
      <div>
      <span>
          {this.state.semiFinalTeams[0].name}
          &nbsp;
          &nbsp;
      </span> VS &nbsp; &nbsp;
      <span>
          {this.state.semiFinalTeams[1].name}
          &nbsp;
          &nbsp;
      </span> 
      </div>
      <div>
      <span>
          {this.state.semiFinalTeams[2].name}
          &nbsp;
          &nbsp;
      </span> VS &nbsp; &nbsp;
      <span>
          {this.state.semiFinalTeams[3].name}
          &nbsp;
          &nbsp;
      </span> 
      </div>
      </span>
       : <SemiFinalForm toggleEventDetailDialog={(value)=>this.props.toggleEventDetailDialog(value)} maxDate={this.state.maxDate} eventId={this.props.activeEvent.id} poolA={this.state.poolA} poolB={this.state.poolB} />
      }
      </Paper>
      <Paper style={style} zDepth={2}>
      <H3>Finals</H3>
      {this.state.finalExists ?
      <div>
      <span>
          {this.state.finalTeams[0].name}
          &nbsp;
          &nbsp;
      </span> VS &nbsp; &nbsp;
      <span>
          {this.state.finalTeams[1].name}
          &nbsp;
          &nbsp;
      </span> 
      </div>
       : <FinalForm toggleEventDetailDialog={(value)=>this.props.toggleEventDetailDialog(value)} maxDate={this.state.maxDate} eventId={this.props.activeEvent.id} semiFinalTeams={this.state.semiFinalTeams} />
      }
      </Paper>
      </div>
      : <div>No Events Available To Organise Match</div>
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
    forceFetch: true,
      variables: {
        eventId: props.activeEvent.id }
    })
  }),
  graphql(createCoachMutation, {name: 'createCoach'})
)(OrganiseMatch)

export default OrganiseMatchMutation;

