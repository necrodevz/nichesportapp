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
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Notifications, {notify} from 'react-notify-toast';


var userID = localStorage.getItem('userID');
const errors = {}

var age = [{"id": 1, "value": "Under 15"}, {"id": 2, "value": "Under 18"}, {"id": 3, "value": "20+"}];
var players = [{"id": 1, "value": "Jhon"}, {"id": 2, "value": "Marko"}, {"id": 3, "value": "Feder"}];
// validation functions
const required = value => (value == null ? 'Required' : undefined);

const validate = values => {
  errors.team_name = required(values.team_name)
  errors.age_group = required(values.age_group)
  errors.team_sport = required(values.team_sport)
  errors.players_count = required(values.players_count)
  errors.team_coach = required(values.team_coach)

  return errors
}

class TeamForm extends Component {
  static propTypes = {
    createTeam: React.PropTypes.func
  }

  submitTeamForm = async () => {
    //const {description, imageUrl} = this.state
    await this.props.createTeam({variables: {name: this.props.TeamName,
                    ageGroup: this.props.AgeGroup,
                   instituteId: 'cj32wbdg7mg3a01460zdkcxoi',
                   teamSport: this.props.TeamSport,
                   playerCount: parseInt(this.props.PlayersCount),
                   teamCoach: this.props.TeamCoach
                    }
                 })
  }

  componentWillMount() {
    this.props.GetCoachListQuery;
    this.props.GetSportsQuery;
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="team_name"
            component={TextField}
            hintText="Team Name"
            floatingLabelText="Team Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="age_group"
            component={SelectField}
            hintText="Age Group"
            style={{"textAlign":"left"}}
            floatingLabelText="Age Group"
            validate={required}
          >
            {age.map(agemapping => (<MenuItem value={agemapping.value} primaryText={agemapping.value} key={agemapping.id} />))}
          </Field>
        </div>
        {this.props.SportsList.allSports ? <div>
                          <Field
                            name="team_sport"
                            component={SelectField}
                            style={{"textAlign":"left"}}
                            hintText="Sport"
                            floatingLabelText="Sport"
                            validate={required}
                          >
                            {this.props.SportsList.allSports.map(sport => (<MenuItem value={sport.id} primaryText={sport.name} key={sport.id} />))}
                          </Field>
                        </div>
                :""}
        <div>
          <Field
            name="players_count"
            component={TextField}
            hintText="No. of Players"
            floatingLabelText="No. of Players"
            validate={required}
          />
        </div>
        {this.props.CoachList.allCoaches ? <div>
                          <Field
                            name="team_coach"
                            component={SelectField}
                            style={{"textAlign":"left"}}
                            hintText="Assign Coach"
                            floatingLabelText="Assign Coach"
                            validate={required}
                          >
                            {this.props.CoachList.allCoaches.map(coach => (<MenuItem value={coach.id} primaryText={coach.user.firstName} key={coach.id} />))}
                          </Field>
                        </div>
                :""}
        <div>
          <RaisedButton label="Submit" disabled={errors.team_name != null || errors.age_group != null || errors.team_sport != null || errors.players_count != null || errors.team_coach != null || submitting} onClick={()=>this.submitTeamForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('team_form');

TeamForm = connect(state => ({
  TeamName: selector(state, 'team_name'),
  AgeGroup: selector(state, 'age_group'),
  TeamSport: selector(state, 'team_sport'),
  PlayersCount: selector(state, 'players_count'),
  TeamCoach: selector(state, 'team_coach'),
}))(TeamForm);

TeamForm = reduxForm({
  form: 'team_form',
  validate
})(TeamForm);


TeamForm.propTypes = {
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

const addMutation = gql`
  mutation createTeam ($name: String!, $instituteId: ID! ,$teamSport: ID!, $teamCoach: ID!, $playerCount: Int!) {
   createTeam(instituteId: $instituteId, sportId: $teamSport, coachId: $teamCoach, managerId: "cj32whu1xpomj01800euaosy8", name: $name, season: 2015, ageGroup: 5, totalNumberOfAthelets: $playerCount) {
    id
  }
  }
`
const GetCoachListQuery = gql`query GetCoachListQuery {
  allCoaches(filter: {institute: {id: "cj32wbdg7mg3a01460zdkcxoi"}}) {
    id
    user { id email firstName lastName }
  }
}`

const GetSportsQuery = gql`query GetSportsQuery {
  allSports {
    id
    name
  }
}`

const TeamFormMutation = compose(
  graphql(addMutation, {name: 'createTeam'}),
  graphql(GetCoachListQuery, {name: 'CoachList'}),
  graphql(GetSportsQuery, {name: 'SportsList'})
)(TeamForm)

export default TeamFormMutation;
