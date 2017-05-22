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

var age = [{"id": 1, "value": "Under 15"}, {"id": 2, "value": "Under 18"}, {"id": 3, "value": "20+"}];
var coaches = [{"id": 1, "value": "Jhon"}, {"id": 2, "value": "Marko"}, {"id": 3, "value": "Feder"}];
// validation functions
const required = value => (value == null ? 'Required' : undefined);

class TeamForm extends Component {
  static propTypes = {
    addPost: React.PropTypes.func
  }

   submitTeamForm = async () => {
    //const {description, imageUrl} = this.state
    await this.props.addPost({variables: {name: this.props.TeamName,
                    age_group: this.props.AgeGroup,
                    typeOfInstitute: this.props.InstituteType,
                    status: "ACTIVE",
                   ownerId: "cj2q1u2hg5yvq0175zo5ymafv" }
                 }).then(()=>console.log('form submitted------'))
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
            floatingLabelText="Age Group"
            validate={required}
          >
            {age.map(agemapping => (<MenuItem value={agemapping.value} primaryText={agemapping.value} key={agemapping.id} />))}
          </Field>
        </div>
        <label>Choose Sports:</label>
        <div>
          <Field name="football" component={Checkbox} label="Football" />
        </div>
        <div>
          <Field name="soccer" component={Checkbox} label="Soccer" />
        </div>
        <div>
          <Field name="rugby" component={Checkbox} label="Rugby" />
        </div>
        <div>
          <Field
            name="players_count"
            component={TextField}
            hintText="No. of Players"
            floatingLabelText="No. of Players"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="players"
            component={TextField}
            hintText="Add Players"
            floatingLabelText="Add Players"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="coach"
            component={SelectField}
            hintText="Assign Coach"
            floatingLabelText="Assign Coach"
            validate={required}
          >
            {coaches.map(coach => (<MenuItem value={coach.value} primaryText={coach.value} key={coach.id} />))}
          </Field>
        </div>
        <div>
          <RaisedButton label="Submit" disabled={submitting} onClick={()=>this.submitTeamForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('team_form');

TeamForm = connect(state => ({
  TeamName: selector(state, 'team_name'),
  AgeGroup: selector(state, 'age_group')
}))(TeamForm);

TeamForm = reduxForm({
  form: 'team_form',
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

export default TeamForm;
