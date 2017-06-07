/*
 *
 * InstituteCoachPage
 *
 */

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import CoachForm from './CoachForm';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

var userID = localStorage.getItem('userID');

export class InstituteCoachPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showCoachForm: false
    }
  }

  toggleCoachForm(value) {
    console.log('value', value);
      this.setState({ showCoachForm: !value })
  }

  render() {
      if (this.props.data.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <div>
      <div >
      {this.state.showCoachForm ? <CoachForm instituteId={this.props.userID} showCoachForm={this.state.showCoachForm} toggleCoachForm={this.toggleCoachForm}/> : <RaisedButton label="Add New Coach" style={{"float": "right","margin-top": "10px","margin-right": "10px"}} onClick={() => this.toggleCoachForm(this.state.showCoachForm)} primary={true} />}
      </div>  
      <div style={{"float": "left"}}>
        <Table>
        <TableHeader displaySelectAll= {false}>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {this.props.data.allCoaches.map(coach=>(
          <TableRow key={coach.id}>
            <TableRowColumn>{coach.id}</TableRowColumn>
            <TableRowColumn>{coach.user.email}</TableRowColumn>
            <TableRowColumn>{coach.user.firstName}</TableRowColumn>
            <TableRowColumn>{coach.user.lastName}</TableRowColumn>
          </TableRow>
          ))
        }
        </TableBody>
      </Table>
      </div>
      </div>
    );
  }
}

const GetCoachListQuery = gql`query GetCoachListQuery ($userID: ID!) {
  allCoaches(filter: {institute:{ owner:{id: $userID }} }) {
    id
    user { id email firstName lastName }
  }
}`

const CoachListData = graphql(GetCoachListQuery, {
  options: {
      variables: {
        userID: userID
      }
    }
  })(InstituteCoachPage);


export default CoachListData;
