import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import MenuItem from 'material-ui/MenuItem';
import {
  SelectField,
  TextField
} from 'redux-form-material-ui';
import countryList from 'components/countryList';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Notifications, {notify} from 'react-notify-toast';
import {GridList, GridTile} from 'material-ui/GridList';
import {removeExtraChar} from '../Global/GlobalFun';
const errors = {};

const required = value => (value == null ? 'Required' : undefined);
const institute_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

const validate = values => {
  
  errors.institute_password = required(values.institute_password)
  errors.institute_name = required(values.institute_name)
  errors.institute_country = required(values.institute_country)
  errors.institute_type = required(values.institute_type)
  errors.institute_sport = required(values.institute_sport)
  errors.institute_email = institute_email(values.institute_email || '')
  if (!values.institute_email) {
    errors.institute_email = 'Required'
  } else if (institute_email(values.institute_email)) {
    errors.institute_email = 'Invalid Email'
  }
  return errors
}
// validation functions

const sportsObject=[];

class InstituteForm extends Component {
  static propTypes = {
    createInstitute: React.PropTypes.func
  }
   submitInstituteForm = async () => {
    for(var i = 0; i < this.props.InstituteSports.length; i++){
      sportsObject.push({sportId: this.props.InstituteSports[i]})
    }
    
    var sports_list = JSON.stringify(sportsObject)
  
    await this.props.createInstitute({variables: {name: this.props.InstituteName,
                    country: this.props.InstituteCountry,
                    typeOfInstitute: this.props.InstituteType,
                    email: this.props.InstituteEmail,
                    password: this.props.InstitutePassword,
                    instituteSport: sportsObject}
                 }).then(()=>notify.show('Institute Created', 'success')).then(()=>this.props.toggleInstituteForm('false')).catch((res)=>notify.show(removeExtraChar(res), 'error'))
  }

  componentWillMount() {
    this.props.GetSportsQuery
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, InstituteName, reset, submitting} = this.props;
    return (
      <div>
      <Notifications />
      <form onSubmit={handleSubmit}>
        <GridList cols={2} cellHeight={90} padding={1}>
          <GridTile>
            <Field
              name="institute_name"
              component={TextField}
              hintText="Institute Name"
              floatingLabelText="Institute Name"
              validate={required}
            />
          </GridTile>
          <GridTile>
            <Field
              name="institute_country"
              component={SelectField}
              hintText="Country"
              maxHeight={200}
              style={{"textAlign":"left"}}
              floatingLabelText="Country"
              validate={required}
            >
              {countryList.map(country => (<MenuItem value={country[0]} primaryText={country[0]} key={country[1]} />))}
            </Field>
          </GridTile>
        </GridList>
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
           <Field
            name="institute_type"
            component={TextField}
            hintText="Type"
            floatingLabelText="Type"
            validate={required}
          />
        </GridTile>
        <GridTile>
          {this.props.data.allSports ? <div>
                            <Field
                              name="institute_sport"
                              multiple={true}
                              component={SelectField}
                              hintText="Sport"
                              style={{"textAlign":"left"}}
                              floatingLabelText="Sport"
                              validate={required}
                            >
                              {this.props.data.allSports.map(sport => (<MenuItem value={sport.id} primaryText={sport.name} key={sport.id} />))}
                            </Field>
                          </div>
                  :""}
        </GridTile>
      </GridList>
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
          <Field
            name="institute_email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, institute_email]}
          />
        </GridTile>
        <GridTile>
          <Field
            name="institute_password"
            component={TextField}
            hintText="Password"
            type="password"
            floatingLabelText="Password"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={90} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <RaisedButton label="Submit" disabled={errors.institute_email != null || errors.institute_password != null || errors.institute_name != null || errors.institute_country != null || errors.institute_type != null || errors.institute_sport != null} onClick={()=>this.submitInstituteForm()} primary={true} />
        </GridTile>
      </GridList>
      </form>
      </div>
    );
  }
}

const selector = formValueSelector('addInstituteForm');

InstituteForm = connect(state => ({
  InstituteName: selector(state, 'institute_name'),
  InstituteCountry: selector(state, 'institute_country'),
  InstituteType: selector(state, 'institute_type'),
  InstituteEmail: selector(state, 'institute_email'),
  InstitutePassword: selector(state, 'institute_password'),
  InstituteSports: selector(state, 'institute_sport')
}))(InstituteForm);

InstituteForm = reduxForm({
  form: 'addInstituteForm',
  validate
})(InstituteForm);


const addMutation = gql`
    mutation createInstitute (
                            $email: String!, 
                            $password: String!,
                            $country: String!, 
                            $name: String!, 
                            $typeOfInstitute: String!,
                            $instituteSport: [UserinstituteOwnerInstituteinstituteSportInstituteSport!]) 
{
  createUser(
   authProvider: 
   {email: {email: $email, password: $password}}, 
   firstName: $name,lastName: $name, role: OWNER, 
   instituteOwner: {country: $country, name: $name, 
                    typeOfInstitute: $typeOfInstitute, 
                     instituteSport: $instituteSport
                   }) 
                {
                  id
                }
}`



const GetSportsQuery = gql`query GetSportsQuery {
  allSports {
    id
    name
  }
}`


const PageWithMutation = compose(
  graphql(addMutation, {name: 'createInstitute'}),
  graphql(GetSportsQuery)
)(InstituteForm)

export default PageWithMutation;
