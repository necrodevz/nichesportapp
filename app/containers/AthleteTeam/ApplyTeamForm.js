import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import H2 from 'components/H2';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {AutoComplete as MUIAutoComplete} from 'material-ui';
import {
  AutoComplete,
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import CenteredSection from '../../containers/HomePage/CenteredSection'
import { graphql, compose } from 'react-apollo'
import IconButton from 'material-ui/IconButton';
import gql from 'graphql-tag'
import SearchIcon from 'material-ui/svg-icons/action/search';
import Paper from 'material-ui/Paper';
var _ = require('lodash');
import Notifications, {notify} from 'react-notify-toast';
import {removeExtraChar} from '../Global/GlobalFun';

const style = {
  height: 300,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const errors = {}

const required = value => (value == null ? 'Required' : undefined);
// validation functions
const validate = values => {

  errors.search_team = required(values.search_team)
  return errors
}

const teamNames = [];

class ApplyTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchEnabled: false,
      searchData: [],
      teamsList: []
    }
  }

  static propTypes = {
    applyTeam: React.PropTypes.func
  }

  submitSearchTeams () {
    var filterData = _.filter(this.state.teamsList, { 'name': this.props.searchText });
    this.setState({searchData: filterData, searchEnabled: true});
  }

  resetSearch () {
    this.setState({searchEnabled: false, searchData: []});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({teamsList: nextProps.TeamsList.allTeams})
  }

  applyTeam = async (teamId) => {
    console.log('11111', teamId);
    await this.props.applyTeam({variables: {athleteId: this.props.userData.athlete.id,
                athleteMessage: this.props.athleteMessage,
                teamId: teamId}
              }).then(()=>this.props.TeamsList.refetch()).then(()=>notify.show('Applied Successfully', 'success')).catch((res)=>notify.show(removeExtraChar(res), 'error'))
  this.state.searchData.length > 0 ? this.submitSearchTeams() : '';
  }

  render() {

    if(this.props.TeamsList.allTeams && teamNames.length === 0){
    for(var index = 0; index < this.props.TeamsList.allTeams.length; index++)
      {teamNames.push(this.props.TeamsList.allTeams[index].name)}
    }

    const {loading, error, handleSubmit, pristine, reset, submitting, userData} = this.props;
    return (
      <CenteredSection>
      <H2>
      <Notifications />
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="search_team"
            fullWidth={true}
            component={AutoComplete}
            filter={MUIAutoComplete.fuzzyFilter}
            dataSource={teamNames}
            hintText="Search by Team Name"
            floatingLabelText="Search by Team Name"
            validate={required}
          />
        </div>
        <div>
          <IconButton onTouchTap={()=>this.submitSearchTeams()} disabled={errors.search_team != null}>
          <SearchIcon />
        </IconButton>
          <RaisedButton label="Reset Search" onTouchTap={()=>this.resetSearch()} disabled={!this.state.searchEnabled} secondary={true} />
        </div>
      </form>
      </H2>
      {this.props.TeamsList.allTeams && !this.state.searchEnabled ? this.props.TeamsList.allTeams.map((team,index)=>(
      <Paper  style={style} zDepth={3} key={team.id}>
        <h3>Team Name: {team.name}</h3>
        <h4>
         <div>Age Group: {team.ageGroup}</div>
         <br/>
         <div>Sport: {team.sport ? team.sport.name : 'Not Available'}</div>
         <br/>
         <div>No. of Players: {team.totalNumberOfAthelets}</div>
         <br/>
         <div>Coach: {team.coach.user.firstName} {team.coach.user.lastName}</div>
        </h4>
        <div>
        <RaisedButton label="Apply" disabled={team.atheletTeams.length > 0 ? (team.atheletTeams[0].status == 'COACHPENDING' || 'APPROVEDBYCOACH' || 'ATHELETPENDING' || 'APPROVEDBYATHLETE'  ? true : false) : false} onTouchTap={()=>this.applyTeam(team.id)} primary={true} />
        </div>
      </Paper>)) : ''}

      {this.state.searchData.length > 0 && this.state.searchEnabled ? this.state.searchData.map((team,index)=>(
      <Paper  style={style} zDepth={3} key={team.id}>
        <h3>Team Name: {team.name}</h3>
        <h4>
         <div>Age Group: {team.ageGroup}</div>
         <br/>
         <div>Sport: {team.sport ? team.sport.name : 'Not Available'}</div>
         <br/>
         <div>No. of Players: {team.totalNumberOfAthelets}</div>
         <br/>
         <div>Coach: {team.coach.user.firstName} {team.coach.user.lastName}</div>
        </h4>
        <div>
        <RaisedButton label="Apply" disabled={team.atheletTeams.length > 0 ? (team.atheletTeams[0].status == 'COACHPENDING' || 'APPROVEDBYCOACH' || 'ATHELETPENDING' || 'APPROVEDBYATHLETE' ? true : false) : false} onTouchTap={()=>this.applyTeam(team.id)} primary={true} />
        </div>
      </Paper>)) : ''}
      </CenteredSection>
    );
  }
}

const getAllTeams = gql`query getAllTeams {
  allTeams {
    id
    atheletTeams{
      status
    }
    name
    season
    ageGroup
    totalNumberOfAthelets
    createdAt
    sport { id name }
    coach { id user { id email firstName lastName }}
    manager { id user { id email firstName lastName }}
  }
}`

const applyTeamMutation = gql`
  mutation applyTeam ($athleteId: ID, $teamId: ID){
   createAtheletTeam(
    athleteId: $athleteId
    teamId: $teamId
    athleteMessage: "Please Accept"
    status:COACHPENDING
  ) {
    id
  }
  }
`

const selector = formValueSelector('search_team_form');

ApplyTeamForm = connect(state => ({
  searchText: selector(state, 'search_team'),
  athleteMessage: selector(state, 'athleteMessage')
}))(ApplyTeamForm);

ApplyTeamForm = reduxForm({
  form: 'search_team_form',
  validate
})(ApplyTeamForm);

const ApplyTeamFormMutation = compose(
  graphql(applyTeamMutation, {name: 'applyTeam'}),
  graphql(getAllTeams, { name: 'TeamsList' })
)(ApplyTeamForm)

export default ApplyTeamFormMutation;
