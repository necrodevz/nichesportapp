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
import PlusIcon from 'material-ui/svg-icons/content/add';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import {GridList, GridTile} from 'material-ui/GridList';

const renderSportsCertificate = ({fields, athleteSports, meta: {error, submitFailed}, SportsList, submitSportsCertificateForm}) => (
  <div>
    <GridList cols={5} cellHeight={80} padding={1} style={{"marginBottom":"-40px"}}>
      <GridTile></GridTile>
      <GridTile cols={4} >Upload multiple certificates:
        <IconButton onTouchTap={() => fields.push({})}>
          <PlusIcon />
        </IconButton>
      </GridTile>
    </GridList>

    {submitFailed && error && <span>{error}</span>}


    {fields.map((sportsCertificates, index) => (
      <span key={index}>
        <GridList cols={5} cellHeight={80} padding={1}>
          <GridTile></GridTile>
          <GridTile>
            <Field
              name={`${sportsCertificates}.certificateUrl`}
              type="text"
              component={TextField}
              hintText="Sports Certificate"
              floatingLabelText="Sports Certificate"
            />
          </GridTile>
          <GridTile>
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
          </GridTile>
          <GridTile>
            <RaisedButton style={{"padding-top":"25px"}} label="Save" onClick={()=>submitSportsCertificateForm(index)} primary={true} />
            <IconButton onTouchTap={() => fields.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </GridTile>
        </GridList>
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
