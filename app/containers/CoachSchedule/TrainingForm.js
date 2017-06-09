import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form/immutable';
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
import IconButton from 'material-ui/IconButton';
import Notifications, {notify} from 'react-notify-toast';
import PlusIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import {GridList, GridTile} from 'material-ui/GridList';

var userID = localStorage.getItem('userID');
const errors = {}

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const validate = values => {
  errors.trainingSessions = required(values.trainingSessions)
  errors.selectTeams = required(values.selectTeams)
  errors.address = required(values.address)
  errors.numberOfSessions = required(values.numberOfSessions)

  return errors
}

const renderTrainingSessions = ({fields, meta: {error, submitFailed}, submitTrainingForm}) => (
  
  <div>
      <GridList cols={5} cellHeight={80} padding={1} style={{"marginBottom":"-40px"}}>
        <GridTile></GridTile>
        <GridTile cols={4} >Add Date & Time for Training Sessions:
          <IconButton onTouchTap={() => fields.push({})}>
            <PlusIcon />
          </IconButton>
        </GridTile>
      </GridList>



      {submitFailed && error && <span>{error}</span>}



    {fields.map((trainingSessions, index) => (
      <span key={index}> 
        <GridList cols={4} cellHeight={80} padding={1}>
          <GridTile></GridTile>
           <GridTile>
                <Field
                  name={`${trainingSessions}.date`}
                  component={DatePicker}
                  hintText="Session Date"
                  floatingLabelText="Session Date"
                  validate={required}
                />
            </GridTile>

            <GridTile>
                <Field
                  name={`${trainingSessions}.time`}
                  component={TimePicker}
                  hintText="Session Time"
                  floatingLabelText="Session Time"
                  validate={required}
                />
            </GridTile>
          <GridTile>
            <IconButton style={{"paddingTop":"25px"}} onTouchTap={() => fields.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </GridTile>
        </GridList>
      </span>
    ))}
  </div>

)

var trainingDateTimes=[];
var trainingTeamsList=[];

class TrainingForm extends Component {
  static propTypes = {
    createTraining: React.PropTypes.func
  }

  submitTrainingForm = async () => {
    
    const {FormSelectTeams, FormAddress, FormTrainingSession, coachProfile} = this.props;
    if(FormTrainingSession.length > 0)
    {
    for(var i = 0; i< FormTrainingSession.length; i++)
    {
        trainingDateTimes.push({date: new Date(""+FormTrainingSession[i].date.toDateString() +' '+ FormTrainingSession[i].time.toString().split(' ')[4])})
    }
    for(var i=0; i< FormSelectTeams.length; i ++ )
    {
      trainingTeamsList.push({teamId: FormSelectTeams[i]})
    }

    await this.props.createTraining({variables: {instituteId: coachProfile.coach.institute.id,
                   coachId: coachProfile.coach.id,
                   sessionCount: parseInt(this.props.SessionCount),
                   trainingSessions: trainingDateTimes,
                   teams: trainingTeamsList,
                   adddress: FormAddress
                    }
                 }).then(()=>this.props.toggleTrainingForm()).then(()=> notify.show('User Created', 'success')).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
   }
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit="">
      <Notifications />
            <GridList cols={2} cellHeight={80} padding={1}>
              <GridTile>
                <Field
                  name="numberOfSessions"
                  component={TextField}
                  hintText="No. of Training Sessions"
                  floatingLabelText="No. of Training Sessions"
                  validate={required}
                />
              </GridTile>
              <GridTile>
                <Field
                  name="address"
                  component={TextField}
                  hintText="Address"
                  floatingLabelText="Address"
                  validate={required}
                />
              </GridTile>
            </GridList>
            <GridList cols={2} cellHeight={80} padding={1}>
            <GridTile>
                {this.props.TeamList.allTeams ? <div>
                          <Field
                            name="selectTeams"
                            component={SelectField}
                            style={{"textAlign":"left"}}
                            hintText="Select Teams"
                            maxHeight={200}
                            multiple={true}
                            floatingLabelText="Select Teams"
                            validate={required}
                          >
                            {this.props.TeamList.allTeams.map(team => (<MenuItem value={team.id} primaryText={team.name} key={team.id} />))}
                          </Field>
                        </div>
                :""}
              </GridTile>
            </GridList>
            <FieldArray submitTrainingForm={(index)=>this.submitTrainingForm(index)} name="trainingSessions" component={renderTrainingSessions} />
            <GridList cols={1} cellHeight={80} padding={1}>
              <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
                <RaisedButton disabled={errors.numberOfSessions != null || errors.selectTeams != null || errors.trainingSessions != null || errors.address != null} onTouchTap={()=> this.submitTrainingForm()} label="Submit" primary={true} />
              </GridTile>
            </GridList>
        </form>
    );
  }
}


TrainingForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const selector = formValueSelector('coachScheduleForm');

TrainingForm = connect(state => ({
  FormTrainingSession: selector(state, 'trainingSessions'),
  FormSelectTeams: selector(state, 'selectTeams'),
  FormAddress: selector(state, 'address'),
  SessionCount: selector(state, 'numberOfSessions')
}))(TrainingForm);

TrainingForm = reduxForm({
  form: 'coachScheduleForm',
  validate
})(TrainingForm);

const addTeam = gql`
  mutation createTraining ($instituteId: ID!, $coachId: ID!, $sessionCount: Int, $address: String, $trainingSessions: [TrainingtrainingDatesTrainingDate!], $teams: [TrainingtrainingTeamsTrainingTeam!]) {
  createTraining(
    instituteId: $instituteId
    coachId: $coachId
    address: $address
    numberOfSessions: $sessionCount
    trainingTeams: $teams
    trainingDates: $trainingSessions
  ){
    id
    trainingTeams{id}
    trainingDates{id}
  }
  }
`
const GetCoachTeamsQuery = gql`query GetCoachTeamsQuery ($userId: ID) {
   allTeams(filter: {
      coach: {
        user:{
          id: $userId
        }
    }
  }
   ) {
    id
    name
    season
    ageGroup
    totalNumberOfAthelets
    createdAt
    sport { id name }
    coach { id user { id email firstName lastName }}
    manager { id user { id email firstName lastName }}
    atheletTeams{
      athlete{ id user{ id email firstName lastName } }
      status
      athleteMessage
    }
  }
}`


const TrainingFormMutation = compose(
  graphql(addTeam, {name: 'createTraining'}),
  graphql(GetCoachTeamsQuery, {name: 'TeamList'}, {
  options: (props) => ({
      variables: {
        userId: props.userId      }
    })
  })
)(TrainingForm)

export default TrainingFormMutation;

