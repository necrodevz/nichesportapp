/*
 *
 * Authorization
 *
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export class Authorization extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('authorization page---------');
  }
  render() {
    return (
      <div>
      Authorize Page
      </div>
    );
  }
}


Authorization.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAuthorize: () => dispatch(push('/'))
  };
}

const UserQuery = gql`mutation UserQuery($idToken: String!) {
  signinUser(auth0: {idToken: $idToken}){
    token
  }
}`

 
const AuthorizeWithData = graphql(UserQuery, {
  options: {
      variables: {
        idToken: localStorage.id_token
      }
    }
  }
)(Authorization)

export default connect(null, mapDispatchToProps)(AuthorizeWithData);

