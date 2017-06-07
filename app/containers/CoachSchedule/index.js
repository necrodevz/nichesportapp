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
import {GridList, GridTile} from 'material-ui/GridList';



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
        onTouchTap={()=>{this.handleClose}}
      />
    ];

    return (
      
      <div>
      <GridList cols={1} cellHeight={80} padding={1}>
        <GridTile>
      <RaisedButton style={{"float": "right","margin-top": "10px","margin-right": "10px"}} label="Create Training" onTouchTap={this.handleOpen} primary={true} />
       <Dialog
          title="Training"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div>
            <form onSubmit="">
            <GridList cols={2} cellHeight={80} padding={1}>
              <GridTile>
                <Field
                  name="training_session"
                  component={TextField}
                  hintText="Training Session"
                  floatingLabelText="Training Session"
                  validate={required}
                />
              </GridTile>
              <GridTile>
                <Field
                  name="dates"
                  component={TextField}
                  hintText="Dates"
                  floatingLabelText="Dates"
                  validate={required}
                />
              </GridTile>
            </GridList>
            <GridList cols={2} cellHeight={80} padding={1}>
              <GridTile>
                <Field
                  name="time"
                  component={TextField}
                  hintText="Time"
                  floatingLabelText="Time"
                  validate={required}
                />
              </GridTile>
              <GridTile>
                <Field
                  name="select_team"
                  component={TextField}
                  hintText="Select Team"
                  floatingLabelText="Select Team"
                  validate={required}
                />
              </GridTile>
            </GridList>
            <GridList cols={2} cellHeight={80} padding={1}>
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
            <GridList cols={1} cellHeight={80} padding={1}>
              <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
                <RaisedButton label="Submit" primary={true} />
              </GridTile>
            </GridList>
        </form>
      </div>
        </Dialog>
      </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={"100%"} style={{"margin": "20px"}}>
        <GridTile>
           <Card>
            <CardHeader
              title="Training"
              style={{"background-color":"#757575"}}
              subtitle=""
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <CoachTrainingList />
            </CardText>
          </Card>
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={"100%"} style={{"margin": "20px"}}>
        <GridTile>
          <Card>
            <CardHeader
              title="Event"
              style={{"background-color":"#757575"}}
              subtitle=""
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <CoachEventsList />
            </CardText>
          </Card>
        </GridTile>
      </GridList>
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
