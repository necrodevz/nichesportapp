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
import TrainingForm from './TrainingForm';



const style = {
  margin: 12,
  align: 'right',
};

const required = value => (value == null ? 'Required' : undefined);

var userId = localStorage.getItem('userID');

export class CoachSchedule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showTrainingForm: false
    }
  }

  closeForm() {
    this.setState({ showTrainingForm: false });
    notify.show('Training Created', 'success');
  }

  toggleTrainingForm(value) {
      this.setState({ showTrainingForm: !value })
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleTrainingForm(this.state.showTrainingForm)}
      />
    ];

    return (
      
      <div>
      <GridList cols={1} cellHeight={80} padding={1}>
        <GridTile>
      <RaisedButton style={{"float": "right","marginTop": "10px","marginRight": "10px"}} label="Create Training" onTouchTap={()=>this.toggleTrainingForm(this.state.showTrainingForm)} primary={true} />
       <Dialog
          title="Training"
          actions={actions}
          autoScrollBodyContent={true}
          modal={false}
          titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
          open={this.state.showTrainingForm}
          onRequestClose={()=>this.toggleTrainingForm(this.state.showTrainingForm)}
        >
          <TrainingForm toggleTrainingForm={()=>this.closeForm()} userId={userId} coachProfile={this.props.coachProfile} />
        </Dialog>
      </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={"100%"} style={{"margin": "20px"}}>
        <GridTile>
           <Card>
            <CardHeader
              title="Training"
              style={{"backgroundColor":"#757575"}}
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
              style={{"backgroundColor":"#757575"}}
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

export default CoachSchedule;
