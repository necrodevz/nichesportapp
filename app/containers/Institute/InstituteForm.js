import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
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

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const institute_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class InstituteForm extends Component {
  componentDidMount() {
    this.refs.institute_name // the Field
      .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
      .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
      .focus(); // on TextField
  }

  render() {
    const {handleSubmit, pristine, InstituteName, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="institute_name"
            component={TextField}
            hintText="Institute Name"
            floatingLabelText="Institute Name"
            validate={required}
            ref="institute_name"
            withRef
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
            ref="institute_email"
            withRef
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
            ref="institute_password"
            withRef
          />
        </div>
        <div>
          <RaisedButton label="Submit" disabled={submitting} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('institute_form');

InstituteForm = connect(state => ({
  InstituteName: selector(state, 'institute_name'),
}))(InstituteForm);

InstituteForm = reduxForm({
  form: 'institute_form',
})(InstituteForm);

export default InstituteForm;
