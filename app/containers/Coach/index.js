/*
 *
 * Coach
 *
 */

import React, { PropTypes } from 'react';
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
import Loading from 'components/LoadingIndicator';

class Coach extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
     if (this.props.data.loading) {
    return (<Loading />)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <div style={{"margin": "50px"}}>
         <Table 
            height={"350px"}
            fixedHeader={true}
            selectable={false}
            multiSelectable={false}>
            >
          <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
            <TableRow>
              <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>ID</TableHeaderColumn>
              <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>First Name</TableHeaderColumn>
              <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Last Name</TableHeaderColumn>
              <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Email</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody 
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              >
          {this.props.data.allCoaches.map(coach=>(
            <TableRow key={coach.id}>
              <TableRowColumn style={{textAlign: 'center'}}>{coach.id}</TableRowColumn>
              <TableRowColumn style={{textAlign: 'center'}}>{coach.user.firstName}</TableRowColumn>
              <TableRowColumn style={{textAlign: 'center'}}>{coach.user.lastName}</TableRowColumn>
              <TableRowColumn style={{textAlign: 'center'}}>{coach.user.email}</TableRowColumn>
            </TableRow>
            ))
          }
          </TableBody>
        </Table>
      </div>
    );
  }
}

const CoachQuery = gql`query CoachQuery {
  allCoaches
  { id user{country email firstName lastName}
  }
}`

const CoachData = graphql(CoachQuery, {options: { pollInterval: 200000 }})(Coach);

export default CoachData;
