import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../auth-utils/AuthService'

export class Login extends React.Component {
  
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  render() {
    const { auth } = this.props
    console.log("ASDadsaasd",this.props.route.auth.login);
    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar >
         <Button bsStyle="primary" onClick={this.props.route.auth.login} >Login </Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;
