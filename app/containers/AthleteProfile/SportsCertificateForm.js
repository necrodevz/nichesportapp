import React, { Component } from 'react'
import {connect} from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Field, FieldArray, reduxForm, formValueSelector} from 'redux-form/immutable';
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
import Dropzone from 'react-dropzone';
import CenteredSection from '../../containers/HomePage/CenteredSection';

const errors = {}

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const validate = values => {
  errors.sportsCertificatesSport = required(values.sportsCertificatesSport)
  return errors
}

class SportsCertificateForm extends Component {
  static propTypes = {
    submitSportsCertificates: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state={
      certificateUrl: '',
      certificateId: ''
    }
  }

  resetFile() {
    this.setState({certificateUrl: '', certificateId: ''});
  }

    onDrop = (files) => {
    // prepare form data, use data key!
    let data = new FormData()
    data.append('data', files[0])

    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/'+`${process.env.GRAPHCOOL_PROJECTID}`, {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(certificate => {
      this.setState({
        certificateId: certificate.id,
        certificateUrl: certificate.url,
      })
    })
  }

  submitSportsCertificateForm = async () => {
    await this.props.submitSportsCertificates({variables: {certificateUrl: this.state.certificateUrl,
                   athleteSportId: this.props.athleteSportId
                    }
                 }).then(()=>notify.show('Certificate Uploaded', 'success')).then(()=>this.props.refetchAthlete.refetch()).then(()=>this.props.toggleSportsCertificateForm('false')).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const {handleSubmit, pristine, reset, submitting, athleteSports} = this.props;
    return (
          <form onSubmit={handleSubmit}>
          <Notifications />
              {!this.state.certificateId &&
              <Dropzone
                onDrop={this.onDrop}
                
                multiple={false}
              >
                <div>Drop a certificate or click to choose</div>
              </Dropzone>}
              {this.state.certificateUrl &&
                <a target="_blank" href={this.state.certificateUrl}>{this.state.certificateUrl}</a>
              }
              {this.props.SportsList.allSports ? <Field
                name="sportsCertificatesSport"
                maxHeight={200}
                validate={required}
                component={SelectField}
                hintText="Sport"
                floatingLabelText="Sport"
              >
              {athleteSports.map(sport => (<MenuItem value={sport.id} primaryText={sport.id} key={sport.id} />))}
              </Field> : '' }     
            <GridList cols={5} cellHeight={90} padding={1}>
            <GridTile>
              <RaisedButton disabled={this.state.certificateUrl == null || errors.sportsCertificatesSport != null} label="Save" onClick={()=>this.submitSportsCertificateForm()} primary={true} />
              <IconButton>
                <DeleteIcon onTouchTap={() => this.resetFile()} />
              </IconButton>
            </GridTile>
            </GridList>
          </form>
    );
  }
}

const selector = formValueSelector('sportsCertificateForm');

SportsCertificateForm = reduxForm({
  form: 'sportsCertificateForm',
  validate
})(SportsCertificateForm);

SportsCertificateForm = connect(state => ({
  athleteSportId: selector(state, 'sportsCertificatesSport')
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
