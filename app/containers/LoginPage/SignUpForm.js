import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {
  TextField
} from 'redux-form-material-ui';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { push } from 'react-router-redux';
import Notifications, {notify} from 'react-notify-toast';
import {GridList, GridTile} from 'material-ui/GridList';

const errors = {}

const required = value => (value == null ? 'Required' : undefined);
const signup_email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

const validate = values => {
  errors.first_name = required(values.first_name)
  errors.last_name = required(values.last_name)
  errors.signup_password = required(values.signup_password)
  errors.signup_email = signup_email(values.signup_email || '')
  if (!values.signup_email) {
    errors.signup_email = 'Required'
  } else if (signup_email(values.signup_email)) {
    errors.signup_email = 'Invalid Email'
  }
  return errors
}


class SignUpForm extends Component {
  

 constructor(props) {
   super(props);
   this.state ={
    isChecked: false
   }
 }

  static propTypes = {
    SignUpAthlete: React.PropTypes.func
  }

   submitSignUpForm = async () => {
    await this.props.SignUpAthlete({variables: {firstName: this.props.FirstName,
                    lastName: this.props.LastName,
                    email: this.props.Email,
                   password: this.props.Password}
                 }).then(()=> alert('Congratulation! You have successfully signed up for Athelink! Please click on the link in the email that was sent to you in order to complete your registration.')).then(()=> location.reload()).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }


 checkboxChange()
{
     let check_box = null
     this.state.isChecked ? check_box = false : check_box = true;
     this.setState({isChecked: check_box});
}

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <CenteredSection>
       <form onSubmit={handleSubmit}>
      <GridList cols={1} cellHeight={110} padding={1}>
        <GridTile>
          <Field
            name="first_name"
            component={TextField}
            hintText="First Name"
            floatingLabelText="First Name"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={110} padding={1}>
        <GridTile>
          <Field
            name="last_name"
            component={TextField}
            hintText="Last Name"
            floatingLabelText="Last Name"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={110} padding={1}>
        <GridTile>
          <Field
            name="signup_email"
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            validate={[required, signup_email]}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={110} padding={5}>
        <GridTile>
          <Field
            name="signup_password"
            component={TextField}
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            validate={required}
          />
        </GridTile>
      </GridList>
      <GridList cols={1} cellHeight={180} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <Checkbox onClick={this.checkboxChange.bind(this)} name="checkbox" label="I have read and agree with the Terms of use." style={{width: '100%', margin: '0 auto',paddingTop:"10px", backgroundColor: '#ffd699',}} />
          <RaisedButton style={{"marginRight":"20px","paddingTop":"20px"}} label="Submit" disabled={errors.checkbox != null || errors.signup_email != null || errors.signup_password != null || errors.first_name != null || errors.last_name != null || this.state.isChecked ==false } onClick={()=>this.submitSignUpForm()} primary={true} />
          <RaisedButton label="Clear" onClick={reset} disabled={pristine || submitting} secondary={true} />
        </GridTile>
      </GridList>
      
      </form>
      </CenteredSection>
    );
  }
}

const selector = formValueSelector('signupForm');

SignUpForm = reduxForm({
  form: 'signupForm',
  validate
})(SignUpForm);


SignUpForm = connect(state => ({
  FirstName: selector(state, 'first_name'),
  LastName: selector(state, 'last_name'),
  Email: selector(state, 'signup_email'),
  Password: selector(state, 'signup_password')
}))(SignUpForm);


const addMutation = gql`
  mutation SignUpAthlete ($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(authProvider: {
    email: {email: $email, password: $password}
  }, firstName: $firstName, lastName: $lastName, role: ATHLETE, athlete: {}) {
    id
}
}
`

const SignUpMutation = graphql(addMutation, {name: 'SignUpAthlete'})(SignUpForm)

export default SignUpMutation;
