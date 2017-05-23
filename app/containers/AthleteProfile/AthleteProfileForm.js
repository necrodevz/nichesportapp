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
import FontIcon from 'material-ui/FontIcon'
import { graphql } from 'react-apollo'
import IconButton from 'material-ui/IconButton';
import gql from 'graphql-tag'
import H3 from 'components/H3';
import countryList from 'components/countryList'
import PublishIcon from 'material-ui/svg-icons/editor/publish';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PlusIcon from 'material-ui/svg-icons/social/plus-one';
import Avatar from 'material-ui/Avatar'

var genders = [{"id": 1, "value": "Male"}, {"id": 2, "value": "Female"}, {"id": 3, "value": "Other"}];
// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class AthleteProfileForm extends Component {
  static propTypes = {
    addPost: React.PropTypes.func
  }

   submitAthleteProfileForm = async () => {
    await this.props.addPost({variables: {name: this.props.FirstName,
                    lastName: this.props.LastName,
                    status: "ACTIVE",
                   ownerId: "cj2q1u2hg5yvq0175zo5ymafv" }
                 }).then(()=>console.log('form submitted------'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form>
       <Avatar size={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCBaY5WK0X77jdCctunaXaBRU6a8vDT7-R3zB1xQUVeB2H4sgz_Sd9Yw" />
        <div>
        <IconButton tooltip="Upload Profile Picture">
          <PublishIcon />
        </IconButton>
        </div>
      <div>
      <H3>Personal Info
      <IconButton tooltip="Edit Profile Info">
          <EditIcon />
        </IconButton>
      </H3>
        <div>
          <Field
            name="full_name"
            component={TextField}
            hintText="Full Name"
            floatingLabelText="Full Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="country"
            component={SelectField}
            hintText="Country"
            floatingLabelText="Country"
            validate={required}
          >
            {countryList.map(country => (<MenuItem value={country[1]} primaryText={country[0]} key={country[1]} />))}
          </Field>
        </div>
        <div>
          <Field
            name="country"
            component={SelectField}
            hintText="Country"
            floatingLabelText="Country"
            validate={required}
          >
            {countryList.map(country => (<MenuItem value={country[1]} primaryText={country[0]} key={country[1]} />))}
          </Field>
        </div>
        <div>
          <Field
            name="dob"
            component={DatePicker}
            hintText="DOB"
            floatingLabelText="DOB"
            validate={required}
          />
        </div>
         <div>
          <Field
            name="gender"
            component={SelectField}
            hintText="Gender"
            floatingLabelText="Gender"
            validate={required}
          >
            {genders.map(gender => (<MenuItem value={gender[1]} primaryText={gender[0]} key={gender[1]} />))}
          </Field>
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
          <Field
            name="timezone"
            component={TimePicker}
            hintText="Timezone"
            floatingLabelText="Timezone"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, email]}
          />
        </div>
        <div>
          <Field
            name="mobile"
            component={TextField}
            hintText="Mobile Number"
            floatingLabelText="Mobile Number"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="height"
            component={SelectField}
            hintText="Height"
            floatingLabelText="Height"
            validate={required}
          >
            {genders.map(gender => (<MenuItem value={gender[1]} primaryText={gender[0]} key={gender[1]} />))}
          </Field>
        </div>
        <div>
          <Field
            name="weight"
            component={SelectField}
            hintText="Weight"
            floatingLabelText="Weight"
            validate={required}
          >
            {genders.map(gender => (<MenuItem value={gender[1]} primaryText={gender[0]} key={gender[1]} />))}
          </Field>
        </div>
        <div>
          <Field
            name="bio"
            component={TextField}
            hintText="Bio"
            floatingLabelText="Bio"
            validate={required}
          />
        </div>
        <a href="#">Change Password Link</a>
        <div>
          <RaisedButton label="Save" disabled={submitting} onClick={()=>this.submitAthleteProfileForm()} primary={true} />
        </div>
      </div>
      <div>
      <H3>Education History
      <IconButton tooltip="Edit Education Info">
          <EditIcon />
        </IconButton>
      </H3>
        <div>
          <Field
            name="highschool"
            component={TextField}
            hintText="High School"
            floatingLabelText="High School"
            validate={required}
          />
          <Field
            name="highschool_year"
            component={TextField}
            hintText="Year"
            floatingLabelText="Year"
            validate={required}
          />
          <Field
            name="highschool_university"
            component={TextField}
            hintText="University"
            floatingLabelText="University"
            validate={required}
          />
           <Field
            name="length_highschool"
            component={TextField}
            hintText="Length of Program"
            floatingLabelText="Length of Program"
            validate={required}
          />
          </div>
          <div>
          <Field
            name="graduation"
            component={TextField}
            hintText="Graduation"
            floatingLabelText="Graduation"
            validate={required}
          />
          <Field
            name="graduation_year"
            component={TextField}
            hintText="Year"
            floatingLabelText="Year"
            validate={required}
          />
          <Field
            name="graduation_university"
            component={TextField}
            hintText="University"
            floatingLabelText="University"
            validate={required}
          />
           <Field
            name="length_graduate"
            component={TextField}
            hintText="Length of Program"
            floatingLabelText="Length of Program"
            validate={required}
          />
          </div>
        <div>
          <Field
            name="academic_year"
            component={TextField}
            hintText="Academic Year"
            floatingLabelText="Academic Year"
            validate={required}
          />
          <Field
            name="institute"
            component={TextField}
            hintText="Institute"
            floatingLabelText="Institute"
            validate={required}
          />
          <Field
            name="sport"
            component={TextField}
            hintText="Sport"
            floatingLabelText="Sport"
            validate={required}
          />
          </div>
           <IconButton tooltip="Add Field">
          <PlusIcon />
        </IconButton>
          <div>
          <RaisedButton label="Save" disabled={submitting} onClick={()=>this.submitAthleteProfileForm()} primary={true} />
          </div>
      </div>
      <div>
      <H3>Main Sports
      <IconButton tooltip="Main Sports Info">
          <EditIcon />
        </IconButton>
      </H3>
        <div>
          <Field
            name="sports_played"
            component={TextField}
            hintText="What sports do you play?"
            floatingLabelText="What sports do you play?"
            validate={required}
          />
          <Field
            name="practice_year"
            component={DatePicker}
            hintText="Started Practicing"
            floatingLabelText="Started Practicing"
            validate={required}
          />
          </div>
           <IconButton tooltip="Add Certificates">
          <PlusIcon />
        </IconButton>
          <div>
          <RaisedButton label="Save" disabled={submitting} onClick={()=>this.submitAthleteProfileForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
          </div>
      </div>
      </form>
    );
  }
}

const selector = formValueSelector('coach_form');

AthleteProfileForm = connect(state => ({
  FirstName: selector(state, 'event_name'),
  lastNameame: selector(state, 'sport')
}))(AthleteProfileForm);

AthleteProfileForm = reduxForm({
  form: 'coach_form',
})(AthleteProfileForm);


AthleteProfileForm.propTypes = {
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

export default AthleteProfileForm;
