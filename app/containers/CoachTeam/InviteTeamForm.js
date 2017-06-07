import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
import { withApollo } from 'react-apollo';
import CenteredSection from '../../containers/HomePage/CenteredSection'
import { graphql, compose } from 'react-apollo'
import IconButton from 'material-ui/IconButton';
import gql from 'graphql-tag'
import SearchIcon from 'material-ui/svg-icons/action/search';
import Paper from 'material-ui/Paper';
var _ = require('lodash');
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CoachInviteModal from './CoachInviteModal'

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
  
  errors.searchTeam = required(values.searchTeam)
  return errors
}

const teamNames = [];

class InviteTeamForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      searchEnabled: false,
      searchData: [],
      showInvitationDialog: false,
      activeIndex: 0,
      activeTeam: null
    }
  }

  toggleInviteDialog(value, index) {
    var activeTeam = {};
    for(var i=0; i< this.props.TeamsList.allTeams.length ; i++)
    {
      if(index == this.props.TeamsList.allTeams[i].id){
        activeTeam = this.props.TeamsList.allTeams[i]
      }
    }     
    this.setState({ showInvitationDialog: !value, activeIndex: index, activeTeam: activeTeam })
    console.log('index', index);
  }

  static propTypes = {
    applyTeam: React.PropTypes.func
  }

  submitSearchTeams () {
    var filterData = _.filter(this.props.TeamsList.allTeams, { 'name': this.props.searchText });
    this.setState({searchData: filterData, searchEnabled: true});
  }

  resetSearch () {
    this.setState({searchEnabled: false, searchData: []});
  }

  applyTeam = async (index) => {
    await this.props.applyTeam({variables: {athleteId: this.props.userData.athlete.id,
                athleteMessage: this.props.athleteMessage,
                teamId: this.props.TeamsList.allTeams[index].id}
                 }).then(()=>this.props.TeamsList)
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleInviteDialog(this.state.showInvitationDialog)}
      />
    ];
    
    if(this.props.TeamsList.allTeams && teamNames.length === 0){ 
    for(var index = 0; index < this.props.TeamsList.allTeams.length; index++)
      {teamNames.push(this.props.TeamsList.allTeams[index].name)}
    }

    const {loading, error, handleSubmit, pristine, reset, submitting, userData} = this.props;
    return (
      <CenteredSection>
      <H2>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="searchTeam"
            fullWidth={true}
            component={AutoComplete}
            filter={MUIAutoComplete.fuzzyFilter}
            dataSource={teamNames}
            hintText="Search by Team Name"
            floatingLabelText="Search by Team Name"
            validate={required}
          />
        </div>
        <Dialog
          title="Team Info"
          autoScrollBodyContent={true}
          actions={actions}
          modal={false}
          autoDetectWindowHeight={true}
          open={this.state.showInvitationDialog}
          onRequestClose={()=>this.toggleInviteDialog(this.state.showInvitationDialog)}
        >
          <CoachInviteModal activeTeam={this.state.activeTeam} toggleInviteDialog={()=>this.toggleInviteDialog()} />
        </Dialog>
        <div>
          <IconButton onTouchTap={()=>this.submitSearchTeams()} disabled={errors.searchTeam != null}>
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
        </h4>
        <div>
        <RaisedButton label="Invite"  onTouchTap={() => this.toggleInviteDialog(this.state.showInvitationDialog, team.id)} primary={true} />
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
        </h4>
        <div>
        <RaisedButton label="Invite" onTouchTap={() => this.toggleInviteDialog(this.state.showInvitationDialog, team.id)} primary={true} />
        </div>
      </Paper>)) : ''}
      </CenteredSection>
    );
  }
}

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

const selector = formValueSelector('coachInviteTeamForm');

InviteTeamForm = connect(state => ({
  searchText: selector(state, 'searchTeam'),
  athleteMessage: selector(state, 'athleteMessage')
}))(InviteTeamForm);

InviteTeamForm = reduxForm({
  form: 'coachInviteTeamForm',
  validate
})(InviteTeamForm);

const InviteTeamFormMutation = compose(
  graphql(applyTeamMutation, {name: 'applyTeam'})
)(InviteTeamForm)

export default InviteTeamFormMutation;

