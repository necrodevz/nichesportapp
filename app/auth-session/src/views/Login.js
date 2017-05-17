import React, { PropTypes as T } from 'react'
import AuthService from '../auth-utils/AuthService'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    return (<div>
        <MuiThemeProvider>
        <RaisedButton label="LogIn/SignUp" onClick={this.props.route.auth.login} primary={true} />
      </MuiThemeProvider>
      </div>
    )
  }
}

export default Login;
