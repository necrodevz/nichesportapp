/*
 *
 * CoachDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoachTeam from '../../containers/CoachTeam';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import CoachTrainingList from './CoachTrainingList';
import CoachEventsList from './CoachEventsList';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
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
import CenteredSection from '../../containers/HomePage/CenteredSection';



const style = {
  margin: 12,
  align: 'right',
};

const required = value => (value == null ? 'Required' : undefined);


export class CoachSchedule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      open : false
    }
  }

// createTraining(
//     instituteId: "cj32wbdg7mg3a01460zdkcxoi"
//     dateTime: "017-05-17T14:03:49.000Z"
//     coachId: "cj32wk6prqm2v01929uytsrez"
//     address: "Crik Train"
//     numberOfSessions: 10
//     trainingTeams:[ 
//       {        teamId:"cj330pw3zrvkf0146ia97nnen" }
//     ]
//     trainingDates:[
//       {        date: "017-05-17T14:03:49.000Z"        }
//     ]
//   ){
//     id
//     trainingTeams{id}
//     trainingDates{id}
//   }


// submitTeamForm = async () => {
//     //const {description, imageUrl} = this.state
//     await this.props.createTeam({variables: {name: this.props.FormTrainingSession,
//                     ageGroup: this.props.FormDates,
//                    instituteId: FormTime,
//                    teamSport: this.props.FormSelectTeam,
//                    address: this.props.Address
//                     }
//                  }).then(()=>location.reload()).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
//   }

  handleOpen = () => {
    console.log("aayaa in open")
    this.setState({open: true});
  };

  handleClose = () => {
    console.log("aayaa in close")
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      
      <div>
      <RaisedButton label="Add New Team" onTouchTap={this.handleOpen} primary={true} />
       <Dialog
          title="Training"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <CenteredSection>
          <form onSubmit="">
          <div>
          <Field
            name="training_session"
            component={TextField}
            hintText="Training Session"
            floatingLabelText="Training Session"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="dates"
            component={TextField}
            hintText="Dates"
            floatingLabelText="Dates"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="time"
            component={TextField}
            hintText="Time"
            floatingLabelText="Time"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="select_team"
            component={TextField}
            hintText="Select Team"
            floatingLabelText="Select Team"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="address"
            component={TextField}
            hintText="Address"
            floatingLabelText="Address"
            validate={required}
          />
        </div>
        <div>
          <RaisedButton label="Submit" primary={true} />
          <RaisedButton label="Clear"  secondary={true} />
        </div>
      </form>
    </CenteredSection>
        </Dialog>
       <Card>
        <CardHeader
          title="Training"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <CoachTrainingList />
        </CardText>
      </Card>
      <Card>
        <CardHeader
          title="Event"
          subtitle=""
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <CoachEventsList />
        </CardText>
    </Card>
      </div>
    );
  }
}

CoachSchedule.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const selector = formValueSelector('coachScheduleForm');

CoachSchedule = connect(state => ({
  FormTrainingSession: selector(state, 'training_session'),
  FormDates: selector(state, 'dates'),
  FormSelectTeam: selector(state, 'select_team'),
  FormTime: selector(state, 'time'),
  FormAddress: selector(state, 'address'),
}))(CoachSchedule);

CoachSchedule = reduxForm({
  form: 'coachScheduleForm',
})(CoachSchedule);


CoachSchedule.propTypes = {
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


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(CoachSchedule);
