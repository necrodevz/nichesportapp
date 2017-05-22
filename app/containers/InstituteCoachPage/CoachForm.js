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

var sports = [{"id": 1, "value": "Football"}, {"id": 2, "value": "Rugby"}, {"id": 3, "value": "Soccer"}];
// validation functions
const required = value => (value == null ? 'Required' : undefined);
const coach_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class CoachForm extends Component {
  static propTypes = {
    addPost: React.PropTypes.func
  }

   submitCoachForm = async () => {
    await this.props.addPost({variables: {name: this.props.FirstName,
                    lastName: this.props.LastName,
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
            name="first_name"
            component={TextField}
            hintText="First Name"
            floatingLabelText="First Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="last_name"
            component={TextField}
            hintText="Last Name"
            floatingLabelText="Last Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="coach_email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, coach_email]}
          />
        </div>
        <div>
          <Field
            name="event_name"
            component={TextField}
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            validate={required}
          />
        </div>
        <div>
          <RaisedButton label="Submit" disabled={submitting} onClick={()=>this.submitCoachForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('coach_form');

CoachForm = connect(state => ({
  FirstName: selector(state, 'event_name'),
  lastNameame: selector(state, 'sport')
}))(CoachForm);

CoachForm = reduxForm({
  form: 'coach_form',
})(CoachForm);


CoachForm.propTypes = {
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

export default CoachForm;
