import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
import {
  SelectField,
  TextField
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Notifications, {notify} from 'react-notify-toast';
import {GridList, GridTile} from 'material-ui/GridList';
import {removeExtraChar} from '../Global/GlobalFun';

const errors = {};

var age = [{"id": 1, "value": "Under 15"}, {"id": 2, "value": "Under 18"}, {"id": 3, "value": "20+"}];

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
    await this.props.createTeam({variables: {name: this.props.TeamName,
                    ageGroup: this.props.AgeGroup,
                   instituteId: this.props.instituteId,
                   teamSport: this.props.TeamSport,
                   playerCount: parseInt(this.props.PlayersCount),
                   teamCoach: this.props.TeamCoach
                    }
                 }).then(() => notify.show('Team Created Successfully', 'success')).then(() => this.props.toggleTeamForm('false')).catch((res) => notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <Notifications/>
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
          <Field
            name="team_name"
            component={TextField}
            hintText="Team Name"
            floatingLabelText="Team Name"
            validate={required}
          />
        </GridTile>
        <GridTile>
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
        </GridTile>
      </GridList>
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
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
        </GridTile>
        <GridTile>
          <Field
            name="players_count"
            component={TextField}
            hintText="No. of Players"
            floatingLabelText="No. of Players"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
        {this.props.CoachList.allCoaches ? <div>
                          <Field
                            name="team_coach"
                            component={SelectField}
                            style={{"textAlign":"left"}}
                            maxHeight={200}
                            hintText="Assign Coach"
                            floatingLabelText="Assign Coach"
                            validate={required}
                          >
                            {this.props.CoachList.allCoaches.map(coach => (<MenuItem value={coach.id} primaryText={coach.user.firstName} key={coach.id} />))}
                          </Field>
                        </div>
                :""}
        </GridTile>
        <GridTile>
          
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={90} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <RaisedButton label="Submit" disabled={errors.team_name != null || errors.age_group != null || errors.team_sport != null || errors.players_count != null || errors.team_coach != null || submitting} onClick={()=>this.submitTeamForm()} primary={true} />
        </GridTile>
      </GridList>
      </form>
    );
  }
}

const selector = formValueSelector('teamForm');

TeamForm = connect(state => ({
  TeamName: selector(state, 'team_name'),
  AgeGroup: selector(state, 'age_group'),
  TeamSport: selector(state, 'team_sport'),
  PlayersCount: selector(state, 'players_count'),
  TeamCoach: selector(state, 'team_coach'),
}))(TeamForm);

TeamForm = reduxForm({
  form: 'teamForm',
  validate
})(TeamForm);

const addMutation = gql`
  mutation createTeam ($name: String!, $instituteId: ID! ,$teamSport: ID!, $ageGroup: String!, $teamCoach: ID!, $playerCount: Int!) {
   createTeam(instituteId: $instituteId, sportId: $teamSport, coachId: $teamCoach, managerId: "cj32whu1xpomj01800euaosy8", name: $name, season: 2015, ageGroup: $ageGroup, totalNumberOfAthelets: $playerCount) {
    id
  }
  }
`
const GetCoachListQuery = gql`query GetCoachListQuery ($instituteId: ID!) {
  allCoaches(filter: {institute: {id: $instituteId}}) {
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
  graphql(GetCoachListQuery, {name: 'CoachList'}, {
  options: (props) => ({
      variables: {
        instituteId: props.instituteId
      }
    })
  }),
  graphql(GetSportsQuery, {name: 'SportsList'})
)(TeamForm)

export default TeamFormMutation;
