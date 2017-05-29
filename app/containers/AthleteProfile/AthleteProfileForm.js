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
import { graphql, compose } from 'react-apollo'
import IconButton from 'material-ui/IconButton';
import gql from 'graphql-tag'
import H3 from 'components/H3';
import countryList from 'components/countryList'
import timezoneList from 'components/timezoneList'
import PublishIcon from 'material-ui/svg-icons/editor/publish';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PlusIcon from 'material-ui/svg-icons/social/plus-one';
import Avatar from 'material-ui/Avatar'
import Notifications, {notify} from 'react-notify-toast';

// var userData=[];

var genders = [{"id": 1, "value": "Male"}, {"id": 2, "value": "Female"}, {"id": 3, "value": "Other"}];
// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);


class AthleteProfileForm extends Component {
  static propTypes = {
    updateUser: React.PropTypes.func,
    updateAthlete: React.PropTypes.func,
    updateAthleteSport: React.PropTypes.func
  }

   submitAthleteProfileForm = async () => {
    await this.props.updateUser({variables: {firstName: this.props.FirstName,
                    lastName: this.props.LastName,
                    athleteID: this.props.userData.athlete.id,
                    email: this.props.Email,
                    country: this.props.Country,
                    dob: this.props.DOB,
                    gender: this.props.Gender,
                    address: this.props.Address,
                    timezone: this.props.TimeZone,
                    mobileNumber: this.props.MobileNumber,
                    height: parseInt(this.props.Height),
                    weight: parseInt(this.props.Weight),
                    bio: this.props.Bio
                     }
                 }).then(()=>console.log('form submitted------'))
  }

  submitAthleteEducationForm = async () => {
    await this.props.updateAthlete({variables: {GraduationName: this.props.GraduationName,
                    GraduationProgramLength: this.props.GraduationProgramLength,
                    athleteID: this.props.userData.athlete.id,
                    GraduationUniversity: this.props.GraduationUniversity,
                    GraduationYear: parseInt(this.props.GraduationYear),
                    HighSchoolName: this.props.HighSchoolName,
                    HighSchoolUniversity: this.props.HighSchoolUniversity,
                    HighSchoolYear: parseInt(this.props.HighSchoolYear)
                     }
                 }).then(()=>console.log('form submitted------'))
  }

  submitSportForm = async () => {
    await this.props.updateAthleteSport({variables: {SportPlayed: this.props.SportPlayed,
                    SportYear: this.props.SportYear,
                    athleteID: this.props.userData.athlete.id,
                     }
                 }).then(()=>console.log('form submitted------'))
  }

  // componentDidMount() {
  //   userData= this.props.userData;
  //   console.log(userData)
  // }


  render() {

    const {loading, error, repos, handleSubmit, pristine, reset, submitting, sportsList, userData, initialValues} = this.props;
    return (
      <form>
       <Avatar size={100} src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Kapil_Dev_at_Equation_sports_auction.jpg" />
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
            name="athlete_first_name"
            component={TextField}
            hintText="First Name"
            floatingLabelText="First Name"
            validate={required}
          />
          <Field
            name="athlete_last_name"
            component={TextField}
            hintText="Last Name"
            floatingLabelText="Last Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="country"
            component={SelectField}
            maxHeight={200}
            hintText="Country"
            floatingLabelText="Country"
            validate={required}
          >
            {countryList.map(country => (<MenuItem value={country[1]} primaryText={country[0]} key={country[1]} />))}
          </Field>
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
            {genders.map(gender => (<MenuItem value={gender.value} primaryText={gender.value} key={gender.id} />))}
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
            component={SelectField}
            maxHeight={200}
            autoWidth={true}
            hintText="Timezone"
            floatingLabelText="Timezone"
            validate={required}
          >
            {timezoneList.map(timezone => (<MenuItem value={timezone.text} primaryText={timezone.text} key={timezone.offset+timezone.value} />))}
          </Field>
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
            component={TextField}
            hintText="Height"
            floatingLabelText="Height"
            validate={required}
          />
          <Field
            name="weight"
            component={TextField}
            hintText="Weight"
            floatingLabelText="Weight"
            validate={required}
          />
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
            name="highschool_length"
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
            name="graduation_length"
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
          <RaisedButton label="Save" disabled={submitting} onClick={()=>this.submitAthleteEducationForm()} primary={true} />
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
            component={SelectField}
            hintText="What sports do you play?"
            floatingLabelText="What sports do you play?"
            validate={required}
          >
            {sportsList.map(sport => (<MenuItem value={sport.id} primaryText={sport.name} key={sport.id} />))}
          </Field>
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
          <RaisedButton label="Save" disabled={submitting} onClick={()=>this.submitSportForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
          </div>
      </div>
      </form>
    );
  }
}

const selector = formValueSelector('athlete_profile_form');

AthleteProfileForm = reduxForm({
  form: 'athlete_profile_form',
  initialValues: {athlete_last_name: 'JHON'}
})(AthleteProfileForm);

AthleteProfileForm = connect((state, ownProps) => ({  
  FirstName: selector(state, 'athlete_first_name'),
  LastName: selector(state, 'athlete_last_name'),
  Country: selector(state, 'country'),
  DOB: selector(state, 'dob'),
  Gender: selector(state, 'gender'),
  Address: selector(state, 'address'),
  TimeZone: selector(state, 'timezone'),
  MobileNumber: selector(state, 'mobile'),
  Height: selector(state, 'height'),
  Weight: selector(state, 'weight'),
  Bio: selector(state, 'bio'),
  HighSchoolName: selector(state, 'highschool'),
  HighSchoolYear: selector(state, 'highschool_year'),
  HighSchoolUniversity: selector(state, 'highschool_university'),
  HighSchoolProgramLength: selector(state, 'highschool_length'),
  GraduationName: selector(state, 'graduation'),
  GraduationYear: selector(state, 'graduation_year'),
  GraduationUniversity: selector(state, 'graduation_university'),
  GraduationProgramLength: selector(state, 'graduation_length'),
  SportPlayed: selector(state, 'sports_played'),
  SportYear: selector(state, 'practice_year'),

}))(AthleteProfileForm);



const updateProfileInfoMutation = gql`
  mutation updateUser ($athleteID: ID!, $firstName: String!, $lastName: String!, $country: String!, $dob: DateTime!, $gender: String!, $address: String!, $timezone: String!, $mobileNumber: String!, $height: Float!, $weight: Float!, $bio: String!) {
   updateUser(id: $athleteID, firstName: $firstName, lastName: $lastName, country: $country, dob: $dob, profileImage: "1212113asc2asc21as2c", gender: $gender, address: $address, timeZone: $timezone, mobileNumber: $mobileNumber, height: $height, weight: $weight, bio: $bio) {
    id
  }
  }
`

const updateEducationInfoMutation = gql`
  mutation updateAthlete ($athleteID: ID!, $GraduationName: String!, $GraduationYear: Int!, $GraduationProgramLength: String!, $GraduationUniversity: String!, $HighSchoolName: String!, $HighSchoolYear: Int!, $HighSchoolUniversity: String! ) {
    updateAthlete(id: $athleteID, graduation: $GraduationName, graduationProgramLength: $GraduationProgramLength, graduationUniversity: $GraduationUniversity, graduationYear: $GraduationYear, hightSchool: $HighSchoolName, hightSchoolUniversity: $HighSchoolUniversity, hightSchoolYear: $HighSchoolYear) {
    id
  }
  }
`

const updateSportInfoMutation = gql`
  mutation updateAthleteSport ($SportPlayed: ID!, $SportYear: DateTime!) {
    createAthleteSport(athleteId: "cj2vmbh2iu3lx0177iu955e6a", sportId: $SportPlayed, participateStartDate: $SportYear) {
    id
  }
  }
`

const AthleteFormMutation = compose(
  graphql(updateProfileInfoMutation, {name: 'updateUser'}),
  graphql(updateEducationInfoMutation, {name: 'updateAthlete'}),
  graphql(updateSportInfoMutation, {name: 'updateAthleteSport'})
)(AthleteProfileForm)

export default AthleteFormMutation;
