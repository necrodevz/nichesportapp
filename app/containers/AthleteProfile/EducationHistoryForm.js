import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import {
  SelectField,
  TextField
} from 'redux-form-material-ui';
import { graphql, compose } from 'react-apollo'
import RaisedButton from 'material-ui/RaisedButton'
import gql from 'graphql-tag'
import IconButton from 'material-ui/IconButton';
import Notifications, {notify} from 'react-notify-toast';
import PlusIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import {GridList, GridTile} from 'material-ui/GridList';
import {removeExtraChar} from '../Global/GlobalFun';


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

const renderEducationHistory = React.createClass({

  componentDidMount() {
    this.props.fields.push({});
  },

  render (){
  var fieldsData = this.props.fields.getAll();
  const {fields, meta: {error, submitFailed}, SportsList, InstitutesList, deleteEducationHistoryForm, submitEducationHistoryForm}=this.props;
  return(
  <div>
      <GridList cols={5} cellHeight={90} padding={1} style={{"marginBottom":"-40px"}}>
        <GridTile></GridTile>
        <GridTile cols={4} >If users have participated in sports, they have to enter following info:
          <IconButton onTouchTap={() => fields.push({})}>
            <PlusIcon />
          </IconButton>
        </GridTile>
      </GridList>



      {submitFailed && error && <span>{error}</span>}



    {fields.map((educationHistory, index) => (
      <span key={index}> 
        <GridList cols={5} cellHeight={90} padding={1}>
          <GridTile></GridTile>
          <GridTile>
            <Field
              name={`${educationHistory}.academicYear`}
              type="text"
              component={TextField}
              hintText="Academic Year"
              floatingLabelText="Academic Year"
            />
          </GridTile>
          <GridTile>
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
          </GridTile>
          <GridTile>
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
          </GridTile>
          <GridTile>
            <RaisedButton style={{"paddingTop":"25px"}} disabled={fieldsData[index].academicYear == null || fieldsData[index].sport == null} label="Save" onClick={()=>submitEducationHistoryForm(index)} primary={true} />
            <IconButton onTouchTap={() => deleteEducationHistoryForm(index).then(()=>fields.remove(index))}>
              <DeleteIcon />
            </IconButton>
          </GridTile>
        </GridList>
      </span>
    ))}
  </div>)
  }
})


class educationHistoryForm extends Component {
  static propTypes = {
    submitEducationHistory: React.PropTypes.func,
    deleteEducationHistory: React.PropTypes.func
  }

  deleteEducationHistoryForm = async (index) => {
    console.log('index========', index)
    this.props.athleteAcademic[index] ?
    //const {description, imageUrl} = this.state
    await this.props.deleteEducationHistory({variables: { educationId: this.props.athleteAcademic[index].id }
                 }).then(()=>notify.show('Sports Participated Deleted Successfully', 'success')).catch((res)=>notify.show(removeExtraChar(res), 'error'))
    : '';
  }

  submitEducationHistoryForm = async (index) => {
    console.log('index========', index)
    //const {description, imageUrl} = this.state
    await this.props.submitEducationHistory({variables: {athleteId: this.props.athleteId,
                    academicYear: parseInt(this.props.educationHistory[index].academicYear),
                   institute: this.props.educationHistory[index].institute,
                   sport: this.props.educationHistory[index].sport,
                    }
                 }).then(()=>notify.show('Sports Participated Added Successfully', 'success')).catch((res)=>notify.show(removeExtraChar(res), 'error'))
  }


  componentDidMount() {
    const{athleteAcademic}=this.props;
    var data = [];
    for(var i=0; i < athleteAcademic.length; i++){
      data.push({academicYear: athleteAcademic[i].createdAt ? new Date(athleteAcademic[i].createdAt).getFullYear() : '', institute: athleteAcademic[i].institute ? athleteAcademic[i].institute.id : '', sport: athleteAcademic[i].sport ? athleteAcademic[i].sport.id : ''})
    }
    this.props.initialize({educationHistory: data});
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
         <div>
         <Notifications />
         <FieldArray SportsList={this.props.SportsList} InstitutesList={this.props.InstitutesList} submitEducationHistoryForm={(index)=>this.submitEducationHistoryForm(index)} deleteEducationHistoryForm={(index)=>this.deleteEducationHistoryForm(index)} name="educationHistory" component={renderEducationHistory} />
          </div>
    );
  }
}

const selector = formValueSelector('educationHistoryForm');

educationHistoryForm = reduxForm({
  form: 'educationHistoryForm',
  enableReinitialize: true
})(educationHistoryForm);

educationHistoryForm = connect(state => ({
  educationHistory: selector(state, 'educationHistory')
}))(educationHistoryForm);


const educationMutation = gql`
  mutation submitEducationHistory ($athleteId: ID!, $institute: ID!, $academicYear: Int , $sport: ID!) {
    createAthleteAcadmic(athleteId: $athleteId, instituteId: $institute, sportId: $sport, academicYear: $academicYear) {
    id
  }
  }`

const deleteEducationMutation = gql`
  mutation deleteEducationHistory ($educationId: ID!) {
  deleteAthleteAcadmic(id: $educationId) {
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
  graphql(deleteEducationMutation, {name: 'deleteEducationHistory'}),
  graphql(GetSportsQuery, {name: 'SportsList'}),
  graphql(GetInstitutesQuery, {name: 'InstitutesList'})
)(educationHistoryForm)


export default educationHistoryMutation;
