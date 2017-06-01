import React, { Component } from 'react'
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Field, FieldArray, reduxForm, formValueSelector} from 'redux-form/immutable';
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

const renderSportsCertificate = ({fields, athleteSports, meta: {error, submitFailed}, SportsList, submitSportsCertificateForm}) => (
  <div>
    <span>
    <IconButton onTouchTap={() => fields.push({})} tooltip="Add Certificate">
          <PlusIcon />
        </IconButton>
      {submitFailed && error && <span>{error}</span>}
    </span>
    {fields.map((sportsCertificates, index) => (
      <span key={index}>
        <h4>sportsCertificates #{index + 1}</h4>
        <Field
          name={`${sportsCertificates}.certificateUrl`}
          type="text"
          component={TextField}
          hintText="Sports Certificate"
          floatingLabelText="Sports Certificate"
        />
        {SportsList.allSports ? <Field
          name={`${sportsCertificates}.sport`}
          type="text"
          maxHeight={200}
          component={SelectField}
          hintText="Sport"
          floatingLabelText="Sport"
        >
        {athleteSports.map(sport => (<MenuItem value={sport.id} primaryText={sport.id} key={sport.id} />))}
        </Field> : '' }
        <RaisedButton label="Save" onClick={()=>submitSportsCertificateForm(index)} primary={true} />
        <IconButton onTouchTap={() => fields.remove(index)} tooltip="Remove Field">
          <DeleteIcon />
        </IconButton>
      </span>
    ))}
  </div>
)


class SportsCertificateForm extends Component {
  static propTypes = {
    submitSportsCertificates: React.PropTypes.func
  }

  submitSportsCertificateForm = async (index) => {
    await this.props.submitSportsCertificates({variables: {certificateUrl: this.props.sportsCertificates[index].certificateUrl,
                   athleteSportId: this.props.sportsCertificates[index].sport,
                    }
                 }).catch((res)=>console.log('error', JSON.stringify(res.message)))
  }

  componentWillMount() {
    this.props.GetSportsQuery;
  }

  render() {
    const {handleSubmit, pristine, reset, submitting, athleteSports} = this.props;
    return (
         <div>
         <FieldArray athleteSports={athleteSports} SportsList={this.props.SportsList} submitSportsCertificateForm={(index)=>this.submitSportsCertificateForm(index)} name="sportsCertificates" component={renderSportsCertificate} />
          </div>
    );
  }
}

const selector = formValueSelector('sportsCertificateForm');

SportsCertificateForm = reduxForm({
  form: 'sportsCertificateForm'
})(SportsCertificateForm);

SportsCertificateForm = connect(state => ({
  sportsCertificates: selector(state, 'sportsCertificates')
}))(SportsCertificateForm);


const sportsMutation = gql`
  mutation submitSportsCertificates ($athleteSportId : ID, $certificateUrl: String!){
    createAthleteAcadmicCertificate(athleteSportId: $athleteSportId, url: $certificateUrl) {
      id
    }
  }`

const GetSportsQuery = gql`query GetSportsQuery {
  allSports {
    id
    name
  }
}`

const SportsCertificatesMutation = compose(
  graphql(sportsMutation, {name: 'submitSportsCertificates'}),
  graphql(GetSportsQuery, {name: 'SportsList'})
  )(SportsCertificateForm)


export default SportsCertificatesMutation;
