import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
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
import RaisedButton from 'material-ui/RaisedButton'
import CenteredSection from '../../containers/HomePage/CenteredSection'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Notifications, {notify} from 'react-notify-toast';

const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

class LoginForm extends Component {
  static propTypes = {
    LoginUser: React.PropTypes.func
  }

  submitLoginForm = async () => {
    //const {description, imageUrl} = this.state
    await this.props.LoginUser({variables: {email: this.props.Email,
                    password: this.props.Password}
                 }).then((res)=>localStorage.setItem('token', res.data.signinUser.token)).then(()=> this.props.GoToHome()).then(()=>location.reload()).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <CenteredSection>
      <Notifications />
       <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, email]}
          />
        </div>
        <div>
          <Field
            name="password"
            component={TextField}
            hintText="Password"
            type="password"
            floatingLabelText="Password"
            validate={required}
          />
        </div>
       <div>
          <RaisedButton label="Submit" onClick={()=>this.submitLoginForm()} disabled={submitting} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </div>
      </form>
      </CenteredSection>
    );
  }
}

const selector = formValueSelector('login_form');

LoginForm = connect(state => ({
  Email: selector(state, 'email'),
  Password: selector(state, 'password')
}))(LoginForm);

LoginForm = reduxForm({
  form: 'login_form',
})(LoginForm);


LoginForm.propTypes = {
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

export function mapDispatchToProps(dispatch) {
  return {
    GoToHome: () => dispatch(push('/'))
  };
}


const addMutation = gql`
  mutation LoginUser ($email: String!, $password: String!) {
    signinUser(email: {
     email: $email, password: $password
  }) {
    token
  }
  }
`

const LoginMutation = graphql(addMutation, {name: 'LoginUser'})(LoginForm)

export default connect (null, mapDispatchToProps)(LoginMutation);
