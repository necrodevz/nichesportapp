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
import RaisedButton from 'material-ui/RaisedButton'
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

const renderEducationHistory = ({fields, meta: {error, submitFailed}, SportsList, InstitutesList, submitEducationHistoryForm}) => (
  <div>
    <span>
    <IconButton onTouchTap={() => fields.push({})} tooltip="Add Field">
          <PlusIcon />
        </IconButton>
      {submitFailed && error && <span>{error}</span>}
    </span>
    {fields.map((educationHistory, index) => (
      <span key={index}>
        <h4>educationHistory #{index + 1}</h4>
        <Field
          name={`${educationHistory}.academicYear`}
          type="text"
          component={TextField}
          hintText="Academic Year"
          floatingLabelText="Academic Year"
        />
        {InstitutesList.allInstitutes ? <Field
          name={`${educationHistory}.institute`}
          type="text"
          maxHeight={200}
          component={SelectField}
          hintText="Institute"
          floatingLabelText="Institute"
        >
        {InstitutesList.allInstitutes.map(institute => (<MenuItem value={institute.id} primaryText={institute.name} key={institute.id} />))}
        </Field> : '' }
        {SportsList.allSports ? <Field
          name={`${educationHistory}.sport`}
          type="text"
          maxHeight={200}
          component={SelectField}
          hintText="Sport"
          floatingLabelText="Sport"
        >
        {SportsList.allSports.map(sport => (<MenuItem value={sport.id} primaryText={sport.name} key={sport.id} />))}
        </Field> : '' }
        <RaisedButton label="Save" onClick={()=>submitEducationHistoryForm(index)} primary={true} />
        <IconButton onTouchTap={() => fields.remove(index)} tooltip="Remove Field">
          <DeleteIcon />
        </IconButton>
      </span>
    ))}
  </div>
)


class educationHistoryForm extends Component {
  static propTypes = {
    submitEducationHistory: React.PropTypes.func
  }

  submitEducationHistoryForm = async (index) => {
    console.log('index========', index)
    //const {description, imageUrl} = this.state
    await this.props.submitEducationHistory({variables: {athleteId: this.props.athleteId,
                    academicYear: parseInt(this.props.educationHistory[index].academicYear),
                   institute: this.props.educationHistory[index].institute,
                   sport: this.props.educationHistory[index].sport,
                    }
                 }).catch((res)=>console.log('error', JSON.stringify(res.message)))
  }


  componentWillMount() {
    this.props.GetSportsQuery;
    this.props.GetInstitutesQuery;
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
         <div>
         <FieldArray SportsList={this.props.SportsList} InstitutesList={this.props.InstitutesList} submitEducationHistoryForm={(index)=>this.submitEducationHistoryForm(index)} name="educationHistory" component={renderEducationHistory} />
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
  mutation submitEducationHistory ($athleteId: ID, $instituteId: ID, $academicYear: Int , $sport: ID) {
    createAthleteAcadmic(athleteId: $athleteId, instituteId: $instituteId, sportId: $sport, academicYear: $academicYear) {
    id
  }
  }`

const GetSportsQuery = gql`query GetSportsQuery {
  allSports {
    id
    name
  }
}`

const GetInstitutesQuery = gql`query GetInstitutesQuery {
  allInstitutes {
    id
    name
  }
}`

const educationHistoryMutation = compose(
  graphql(educationMutation, {name: 'submitEducationHistory'}),
  graphql(GetSportsQuery, {name: 'SportsList'}),
  graphql(GetInstitutesQuery, {name: 'InstitutesList'})
)(educationHistoryForm)


export default educationHistoryMutation;
