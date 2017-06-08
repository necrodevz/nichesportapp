/*
 *
 * AthleteDashboard
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';
import AthleteTrainingList from './AthleteTrainingList';
import AthleteEventList from './AthleteEventList';
import AthleteUpcomingEventList from './AthleteUpcomingEventList';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {
  AutoComplete,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui';
import {GridList, GridTile} from 'material-ui/GridList';


const style = {
  margin: 12,
  align: 'right',
};

const required = value => (value == null ? 'Required' : undefined);


export class AthleteSchedule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      open : false
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    return (
      
      <div>
      <GridList cols={1} cellHeight={80} padding={1}>
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
              <AthleteTrainingList />
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
              <AthleteEventList />
            </CardText>
          </Card>
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={"100%"} style={{"margin": "20px"}}>
        <GridTile>
          <Card>
            <CardHeader
              title="Upcoming Event"
              style={{"background-color":"#757575"}}
              subtitle=""
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <AthleteUpcomingEventList />
            </CardText>
          </Card>
        </GridTile>
      </GridList>
      </div>
    );
  }
}

AthleteSchedule.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const selector = formValueSelector('AthleteScheduleForm');

AthleteSchedule = connect(state => ({
  FormTrainingSession: selector(state, 'training_session'),
  FormDates: selector(state, 'dates'),
  FormSelectTeam: selector(state, 'select_team'),
  FormTime: selector(state, 'time'),
  FormAddress: selector(state, 'address'),
}))(AthleteSchedule);

AthleteSchedule = reduxForm({
  form: 'AthleteSchedule',
})(AthleteSchedule);


AthleteSchedule.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AthleteSchedule);
