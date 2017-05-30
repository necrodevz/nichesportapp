import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
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
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import IconButton from 'material-ui/IconButton';
import Notifications, {notify} from 'react-notify-toast';
import PlusIcon from 'material-ui/svg-icons/social/plus-one';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';

// const errors = {}

// const required = value => (value == null ? 'Required' : undefined);
// const email = value =>
//   (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
//     ? 'Invalid email'
//     : undefined);

// const validate = values => {
//    if (!values.educationHistory || !values.educationHistory.length) {
//     errors.educationHistory = {_error: 'At least one educationHistory must be entered'}
//   } else {
//     const educationHistoryArrayErrors = []
//     values.educationHistory.forEach((educationHistory, educationHistoryIndex) => {
//       const educationHistoryErrors = {}
//       if (!educationHistory || !educationHistory.academicYear) {
//         educationHistoryErrors.academicYear = 'Required'
//         educationHistoryArrayErrors[educationHistoryIndex] = educationHistoryErrors
//       }
//       if (!educationHistory || !educationHistory.institute) {
//         educationHistoryErrors.institute = 'Required'
//         educationHistoryArrayErrors[educationHistoryIndex] = educationHistoryErrors
//       }
//       if (!educationHistory || !educationHistory.sport) {
//         educationHistoryErrors.sport = 'Required'
//         educationHistoryArrayErrors[educationHistoryIndex] = educationHistoryErrors
//       }
//     })
//   }
//   return errors
// }

const renderEducationHistory = ({fields, meta: {error, submitFailed}, SportsList}) => (
  <div>
    <span>
    <IconButton onTouchTap={() => fields.push({})} tooltip="Add Field">
          <PlusIcon />
        </IconButton>
      {submitFailed && error && <span>{error}</span>}
    </span>
    {fields.map((educationHistory, index) => (
      <span key={index}>
      <div>
      <IconButton onTouchTap={() => fields.remove(index)} tooltip="Remove Field">
          <DeleteIcon />
        </IconButton>
        </div>
        <h4>educationHistory #{index + 1}</h4>
        <Field
          name={`${educationHistory}.academicYear`}
          type="text"
          component={TextField}
          hintText="Academic Year"
          floatingLabelText="Academic Year"
        />
        <Field
          name={`${educationHistory}.institute`}
          type="text"
          component={TextField}
          hintText="Institute"
          floatingLabelText="Institute"
        />
        {SportsList.allSports ? <Field
          name={`${educationHistory}.sport`}
          type="text"
          component={SelectField}
          hinText="Sport"
          floatingLabelText="Sport"
        >
        {SportsList.allSports.map(sport => (<MenuItem value={sport.id} primaryText={sport.name} key={sport.id} />))}
        </Field> : '' }
      </span>
    ))}
  </div>
)


class educationHistoryForm extends Component {
  static propTypes = {
    submitEducationHistory: React.PropTypes.func
  }

  submitTeamForm = async () => {
    //const {description, imageUrl} = this.state
    await this.props.submitEducationHistory({variables: {athleteId: this.props.athleteId,
                    academicYear: this.props.educationHistory.academicYear,
                   institute: this.props.educationHistory.institute,
                   sport: this.props.educationHistory.sport,
                    }
                 }).catch((res)=>console.log('error', JSON.stringify(res.message)))
  }


  componentWillMount() {
    this.props.GetSportsQuery;
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
         <div>
         <FieldArray SportsList={this.props.SportsList} name="educationHistory" component={renderEducationHistory} />
          </div>
    );
  }
}

const selector = formValueSelector('educationHistoryForm');

educationHistoryForm = reduxForm({
  form: 'educationHistoryForm'
})(educationHistoryForm);

educationHistoryForm = connect(state => ({
  educationHistory: selector(state, 'educationHistory')
}))(educationHistoryForm);


const educationMutation = gql`
  mutation submitEducationHistory ($athleteId: String, $academicYear: String, $institute: String, $sport: String) {
    createAthleteAcadmic(athleteId: "cj32xcep72o920192ey78063a", instituteId: "cj32wbdg7mg3a01460zdkcxoi", sportId: "cj32w829hbqfo01565f0zeimp", academicYear: 2015) {
    id
  }
  }`

const GetSportsQuery = gql`query GetSportsQuery {
  allSports {
    id
    name
  }
}`

const educationHistoryMutation = compose(
  graphql(educationMutation, {name: 'submitEducationHistory'}),
  graphql(GetSportsQuery, {name: 'SportsList'})
)(educationHistoryForm)


export default educationHistoryMutation;
