import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
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
import {GridList, GridTile} from 'material-ui/GridList';
import Notifications, {notify} from 'react-notify-toast';


const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

// validation functions
const errors = {}

const required = value => (value == null ? 'Required' : undefined);
const teamCount = value =>
  (value && !/^-?\d*[02468]$/i.test(value)
    ? 'Please Select Even Number of Teams'
    : undefined);

// validation functions
const validate = values => {

  errors.eventName = required(values.eventName)
  errors.sport = required(values.sport)
  errors.startDate = required(values.startDate)
  errors.eventType = required(values.eventType)
  errors.teamCount = required(values.teamCount || '')
  if (!values.teamCount) {
    errors.teamCount = 'Required'
  } else if (teamCount(values.teamCount)) {
    errors.teamCount = 'Please Select Even Number of Teams'
  }
  errors.teamsSelected = required(values.teamsSelected)
  errors.matchesCount = required(values.matchesCount)
  errors.address = required(values.address)
  return errors
}

var n = 0;
var endDateAddendum = 0;
var teamsSelected = [];

class EventForm extends Component {
  constructor(props) {
    super(props);
     this.handleSelectTeamsChange = this.handleSelectTeamsChange.bind(this);
     //this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }
  static propTypes = {
    createInstituteEvent: React.PropTypes.func,
    initialize: React.PropTypes.func.isRequired
  }

   submitEventForm = async () => {
    for(var i= 0; i < this.props.teamsSelected.length ; i++)
    {
      teamsSelected.push({teamId: this.props.teamsSelected[i]})
    }
    await this.props.createInstituteEvent({variables: {eventName: this.props.eventName,
                    sportId: this.props.sport,
                    instituteId: this.props.instituteId,
                    teamsCount: this.props.teamsCount,
                    matchesCount: this.props.teamsCount,
                    startDate: this.props.startDate,
                    address: this.props.address,
                    selectedTeams: teamsSelected,
                    eventType: this.props.eventType
                    }
                 }).then(()=>notify.show('Event Created Successfully', 'success')).then(()=>this.props.toggleEventForm('false')).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  // handleStartDateChange(startDate) {
  //   //console.log('value of endDateAddendum', endDateAddendum);
  //   //console.log('startdate', startDate);
  //   console.log('2222222', this.props);
  //   var endDate= new Date();
  //   endDate = new Date(endDate.setDate(startDate.getDate()+endDateAddendum)) 
  //   //console.log('33333', endDate);
  //   this.props.initialize({ eventName: this.props.eventName,
  //     address: this.props.address,
  //     sport: this.props.sport,
  //     teamsSelected: this.props.teamsSelected,
  //     startDate: startDate,
  //     teamCount: this.props.teamsSelected ? this.props.teamsSelected.length+1 : 0,
  //     matchesCount: (n*(n-1))+3,
  //     endDate: endDate })
  // }

  handleSelectTeamsChange() {
    var that = this;
    n = errors.teamCount != null && this.props.teamsSelected ? Math.ceil((that.props.teamsSelected.length+1)/2) : 0;
    //console.log("handle Select Teams change", that.props);
    //console.log('value of n', n);
    this.props.initialize({
      eventName: this.props.eventName,
      address: this.props.address,
      sport: this.props.sport,
      teamsSelected: this.props.teamsSelected,
      startDate: this.props.startDate,
      teamCount: this.props.teamsSelected ? that.props.teamsSelected.length+1 : 0,
      matchesCount: (n*(n-1))+3
    })
    endDateAddendum = ((n*(n-1))/2)-1+3+3;
    //console.log('value of endDateAddendum', endDateAddendum);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('updateeeeee', nextProps);
  //   nextProps.startDate ? this.handleStartDateChange(nextProps.startDate) : console.log('else case');
  // }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <Notifications />
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
          <Field
            name="eventName"
            component={TextField}
            hintText="Event Name"
            floatingLabelText="Event Name"
            validate={required}
          />
        </GridTile>
        <GridTile>
          <Field
            name="sport"
            component={SelectField}
            hintText="Sport"
            errorText={errors.sport}
            style={{"textAlign":"left"}}
            floatingLabelText="Sport"
            validate={required}
          >
            {this.props.SportsList.allSports && this.props.SportsList.allSports.map(sport => (<MenuItem value={sport.id} primaryText={sport.name} key={sport.id} />))}
          </Field>
        </GridTile>
      </GridList>
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
          <Field
            name="teamsSelected"
            component={SelectField}
            hintText="Select Teams"
            onChange = { ()=>this.handleSelectTeamsChange() }
            style={{"textAlign":"left"}}
            floatingLabelText="Select Teams"
            multiple={true}
            errorText={errors.teamCount}
            maxHeight={200}
            validate={required}
          >
            {this.props.TeamsList.allTeams && this.props.TeamsList.allTeams.map(team => (<MenuItem value={team.id} primaryText={team.name} key={team.id} />))}
          </Field>
        </GridTile>
         <GridTile>
          <Field
            name="eventType"
            component={SelectField}
            hintText="Select Event Type"
            style={{"textAlign":"left"}}
            floatingLabelText="Select Event Type"
            maxHeight={200}
            validate={required}
          >
            <MenuItem value={"Type1"} primaryText={"Type1"} />
            <MenuItem value={"Type2"} primaryText={"Type2"} />
          </Field>
        </GridTile>
        <GridTile>
          <Field
            name="teamCount"
            disabled={true}
            component={TextField}
            hintText="No. of Teams"
            floatingLabelText="No. of Teams"
            validate={required}
          />
        </GridTile>
        <GridTile>
          <Field
            name="matchesCount"
            disabled={true}
            component={TextField}
            hintText="Number of Matches:"
            floatingLabelText="Number of Matches:"
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
        <GridTile>
          <Field
            name="startDate"
            component={DatePicker}
            hintText="Start Date"
            floatingLabelText="Start Date"
            errorText = {errors.startDate}
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={90} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <RaisedButton style={{"marginRight":"15px"}} label="Submit" disabled={errors.teamCount != null || errors.address != null || errors.sport != null || errors.eventName != null || errors.teamsSelected != null || errors.matchesCount != null || errors.startDate != null || errors.eventType != null} onClick={()=>this.submitEventForm()} primary={true} />
        </GridTile>
      </GridList>
      </form>
    );
  }
}

const getAllSports = gql`query getAllSports {
   allSports {
    id
    name
  }
}`

const getInstituteTeams = gql`query getInstituteTeams ($instituteId: ID) {
  allTeams(filter: {institute: {id: $instituteId}}) {
    id
    name
  }
}`

const createEventMutation = gql`
  mutation createEventMutation ($instituteId: ID, $eventType: String, $sportId: ID, $eventName: String, $teamsCount: Int, $matchesCount: Int, $startDate: DateTime, $address: String, $selectedTeams: [EventteamsEventTeam!] ){
    createEvent(
    name: $eventName
    instituteId: $instituteId
    sportId: $sportId
    numberOfFixtures: $matchesCount
    numberOfTeams: $teamsCount
    address: $address
    startDate: $startDate
    type: $eventType
    teams: $selectedTeams
  ){
    id
  }
  }
`

const selector = formValueSelector('instituteCreateEventForm');

EventForm = connect(state => ({
  eventName: selector(state, 'eventName'),
  sport: selector(state, 'sport'),
  teamsSelected: selector(state, 'teamsSelected'),
  address: selector(state, 'address'),
  startDate: selector(state, 'startDate'),
  teamCount: selector(state, 'teamCount'),
  matchesCount: selector(state, 'matchesCount'),
  eventType: selector(state, 'eventType'),
}))(EventForm);

EventForm = reduxForm({
  form: 'instituteCreateEventForm',
  
  validate
})(EventForm);


const createEventFormMutation = compose(
  graphql(createEventMutation, {name: 'createInstituteEvent'}),
  graphql(getAllSports, { name: 'SportsList' }),
  graphql(getInstituteTeams, { name: 'TeamsList' }, {options: (props) => ({variables: {
    instituteId: props.instituteId
  }})
})
)(EventForm)


export default createEventFormMutation;
