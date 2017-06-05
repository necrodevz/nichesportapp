/*
 *
 * Coach
 *
 */

import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import H3 from 'components/H3';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import gql from 'graphql-tag';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Coach extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
     if (this.props.data.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <CenteredSection>
         <Table>
          <TableHeader displaySelectAll= {false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Country</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {this.props.data.allCoaches.map(coach=>(
            <TableRow key={coach.id}>
              <TableRowColumn>{coach.id}</TableRowColumn>
              <TableRowColumn>{coach.user.country}</TableRowColumn>
              <TableRowColumn>{coach.user.firstName} {coach.user.lastName}</TableRowColumn>
              <TableRowColumn>{coach.user.email}</TableRowColumn>
            </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </CenteredSection>
    );
  }
}

const CoachQuery = gql`query CoachQuery {
  allCoaches
  { id user{country email firstName lastName}
  }
}`

const CoachData = graphql(CoachQuery)(Coach);

export default CoachData;
