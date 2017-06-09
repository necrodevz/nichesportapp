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
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {GridList, GridTile} from 'material-ui/GridList';


const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

var sports = [{"id": 1, "value": "Football"}, {"id": 2, "value": "Rugby"}, {"id": 3, "value": "Soccer"}];
// validation functions
const required = value => (value == null ? 'Required' : undefined);

class EventForm extends Component {
  static propTypes = {
    addPost: React.PropTypes.func
  }

   submitEventForm = async () => {
    //const {description, imageUrl} = this.state
    await this.props.addPost({variables: {name: this.props.TeamName,
                    sport: this.props.AgeGroup,
                    typeOfInstitute: this.props.InstituteType,
                    status: "ACTIVE",
                   ownerId: "cj2q1u2hg5yvq0175zo5ymafv" }
                 }).then(()=>console.log('form submitted------'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <GridList cols={2} cellHeight={80} padding={1}>
        <GridTile>
          <Field
            name="event_name"
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
            style={{"textAlign":"left"}}
            floatingLabelText="Sport"
            validate={required}
          >
            {sports.map(sport => (<MenuItem value={sport.value} primaryText={sport.value} key={sport.id} />))}
          </Field>
        </GridTile>
      </GridList>
      <GridList cols={2} cellHeight={80} padding={1}>
        <GridTile>
          <Field
            name="start_date"
            component={DatePicker}
            hintText="Start Date"
            floatingLabelText="Start Date"
            validate={required}
          />
        </GridTile>
        <GridTile>
          <Field
            name="end_date"
            component={DatePicker}
            hintText="End Date"
            floatingLabelText="End Date"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={2} cellHeight={80} padding={1}>
        <GridTile>
          <Field
            name="teams_count"
            component={TextField}
            hintText="No. of Teams"
            floatingLabelText="No. of Teams"
            validate={required}
          />
        </GridTile>
        <GridTile>
          <Field
            name="matches_count"
            component={TextField}
            hintText="How many matches will be played"
            floatingLabelText="How many matches will be played"
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
        <GridTile></GridTile>
      </GridList>
      <GridList cols={1} cellHeight={80} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <RaisedButton style={{"marginRight":"15px"}} label="Submit" disabled={submitting} onClick={()=>this.submitEventForm()} primary={true} />
        </GridTile>
      </GridList>
      </form>
    );
  }
}

const selector = formValueSelector('team_form');

EventForm = connect(state => ({
  TeamName: selector(state, 'event_name'),
  AgeGroup: selector(state, 'sport')
}))(EventForm);

EventForm = reduxForm({
  form: 'team_form',
})(EventForm);


EventForm.propTypes = {
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

export default EventForm;
