import React from 'react';
import H3 from 'components/H3';
import RaisedButton from 'material-ui/RaisedButton'
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

export class CoachTeamPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    return true;
  }

  render() {
    if (this.props.TeamsList.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.TeamsList.error) {
    console.log(this.props.TeamsList.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <CenteredSection>
         <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>season</TableHeaderColumn>
        <TableHeaderColumn>Age Group</TableHeaderColumn>
        
        <TableHeaderColumn>totalNumberOfAthelets</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
    {this.props.TeamsList.allTeams.map(team=>(
      <TableRow key={team.id}>
        <TableRowColumn>{team.id}</TableRowColumn>
        <TableRowColumn>{team.name}</TableRowColumn>
        <TableRowColumn>{team.season}</TableRowColumn>
        <TableRowColumn>{team.ageGroup}</TableRowColumn>
        <TableRowColumn>{team.totalNumberOfAthelets}</TableRowColumn>

      </TableRow>
      ))
    }
    </TableBody>
  </Table>
      </CenteredSection>
    );
  }
}

export default CoachTeamPage;
