import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
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
import countryList from './countryList'
import RaisedButton from 'material-ui/RaisedButton'
import CenteredSection from '../../containers/HomePage/CenteredSection'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const institute_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class InstituteForm extends Component {
  static propTypes = {
    addPost: React.PropTypes.func
  }

   submitInstituteForm = async () => {
    //const {description, imageUrl} = this.state
    await this.props.addPost({variables: {name: this.props.InstituteName,
                    country: this.props.InstituteCountry,
                    typeOfInstitute: this.props.InstituteType,
                    status: "ACTIVE",
                   ownerId: "cj2q1u2hg5yvq0175zo5ymafv" }
                 })
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, InstituteName, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="institute_name"
            component={TextField}
            hintText="Institute Name"
            floatingLabelText="Institute Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="institute_country"
            component={SelectField}
            hintText="Institute Country"
            floatingLabelText="Institute Country"
            validate={required}
          >
            {countryList.map(country => (<MenuItem value={country[1]} primaryText={country[0]} key={country[1]} />))}
          </Field>
        </div>
        <div>
          <Field
            name="institute_type"
            component={TextField}
            hintText="Institute Type"
            floatingLabelText="Institute Type"
            validate={required}
          />
        </div>
        <label>Choose Sports:</label>
        <div>
          <Field name="football" component={Checkbox} label="Football" />
        </div>
        <div>
          <Field name="soccer" component={Checkbox} label="Soccer" />
        </div>
        <div>
          <Field name="rugby" component={Checkbox} label="Rugby" />
        </div>
        <div>
          <Field
            name="institute_email"
            component={TextField}
            hintText="Institute Email"
            floatingLabelText="Institute Email"
            validate={[required, institute_email]}
          />
        </div>
        <div>
          <Field
            name="institute_password"
            component={TextField}
            hintText="Institute Password"
            type="password"
            floatingLabelText="Institute Password"
            validate={required}
          />
        </div>
        <div>
          <RaisedButton label="Submit" disabled={submitting} onClick={()=>this.submitInstituteForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('institute_form');

InstituteForm = connect(state => ({
  InstituteName: selector(state, 'institute_name'),
  InstituteCountry: selector(state, 'institute_country'),
  InstituteType: selector(state, 'institute_type'),
  InstituteEmail: selector(state, 'institute_email'),
  InstitutePassword: selector(state, 'institute_password')
}))(InstituteForm);

InstituteForm = reduxForm({
  form: 'institute_form',
})(InstituteForm);


InstituteForm.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: () => {
      dispatch(createInstitute());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const addMutation = gql`
  mutation addPost($name: String!, $country: String!, $status: INSTITUTE_STATUS!, $typeOfInstitute:String!, $ownerId: ID!) {
    createInstitute(name: $name, country: $country, status: $status, typeOfInstitute : $typeOfInstitute, ownerId : $ownerId ) {
      id,
      name,
      country,
      typeOfInstitute
    }
  }
`

const PageWithMutation = graphql(addMutation, {name: 'addPost'})(InstituteForm)

export default connect(mapStateToProps, mapDispatchToProps)(PageWithMutation);
