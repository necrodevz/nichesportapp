import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
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
import CenteredSection from '../../containers/HomePage/CenteredSection'
import { graphql } from 'react-apollo'
import IconButton from 'material-ui/IconButton';
import gql from 'graphql-tag'
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import PlusIcon from 'material-ui/svg-icons/social/plus-one';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';

var age = [{"id": 1, "value": "Under 15"}, {"id": 2, "value": "Under 18"}, {"id": 3, "value": "20+"}];
// validation functions
const required = value => (value == null ? 'Required' : undefined);

class MyTeamForm extends Component {
  static propTypes = {
    addPost: React.PropTypes.func
  }

   submitMyTeamForm = async () => {
    await this.props.addPost({variables: {name: this.props.FirstName,
                    lastName: this.props.LastName,
                    status: "ACTIVE",
                   ownerId: "cj2q1u2hg5yvq0175zo5ymafv" }
                 }).then(()=>console.log('form submitted------'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <CenteredSection>
      <H2>Current Team
      <IconButton tooltip="Add Team">
          <PlusIcon />
        </IconButton>
      </H2>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="team_name"
            component={TextField}
            hintText="Team"
            floatingLabelText="Team"
            validate={required}
          />
          <Field
            name="season"
            component={TextField}
            hintText="Season"
            floatingLabelText="Season"
            validate={required}
          />
          <Field
            name="age_group"
            component={SelectField}
            hintText="Age Group"
            floatingLabelText="Age Group"
            validate={required}
          >
            {age.map(agemapping => (<MenuItem value={agemapping.value} primaryText={agemapping.value} key={agemapping.id} />))}
          </Field>
          <IconButton tooltip="Edit Team">
          <EditIcon />
        </IconButton>
        <IconButton tooltip="Delete Team">
          <DeleteIcon />
        </IconButton>
        </div>
        <div>
          <RaisedButton label="Submit" disabled={submitting} onClick={()=>this.submitMyTeamForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
      </CenteredSection>
    );
  }
}

const selector = formValueSelector('coach_form');

MyTeamForm = connect(state => ({
  FirstName: selector(state, 'event_name'),
  lastNameame: selector(state, 'sport')
}))(MyTeamForm);

MyTeamForm = reduxForm({
  form: 'coach_form',
})(MyTeamForm);


MyTeamForm.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  coach: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
};

export default MyTeamForm;
