/*
 *
 * Athlete
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

class Athlete extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
     if (this.props.data.loading) {
    return (<div>Loading</div>)
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
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Country</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Email</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              >
            {this.props.data.allAthletes.map(athlete=>(
              <TableRow key={athlete.id}>
                <TableRowColumn style={{textAlign: 'center'}}>{athlete.id}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{athlete.user.country}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{athlete.user.firstName} {athlete.user.lastName}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{athlete.user.email}</TableRowColumn>
              </TableRow>
              ))
            }
            </TableBody>
        </Table>
      </div>
    );
  }
}

const AthleteQuery = gql`query AthleteQuery {
  allAthletes
  { id user{country email firstName lastName}
  }
}`

const AthleteData = graphql(AthleteQuery)(Athlete);

export default AthleteData;
