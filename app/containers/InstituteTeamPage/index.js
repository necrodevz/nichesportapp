/*
 *
 * InstituteTeamPage
 *
 */
import React from 'react';
import H3 from 'components/H3';
import TeamForm from './TeamForm'
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

export class InstituteTeamPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showTeamForm: false
    }
  }

  toggleTeamForm(value) {
    console.log('value', value);
      this.setState({ showTeamForm: !value })
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return true;
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
      <CenteredSection>
        <H3>Hey , there are {this.props.data.allInstitutes.length} Teams in your account</H3>
        {this.state.showTeamForm ? <TeamForm showTeamForm={this.state.showTeamForm} toggleTeamForm={this.toggleTeamForm}/> : <RaisedButton label="Add New Team" onClick={() => this.toggleTeamForm(this.state.showTeamForm)} primary={true} />}
         <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Country</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
    {this.props.data.allInstitutes.map(institute=>(
      <TableRow key={institute.id}>
        <TableRowColumn>{institute.id}</TableRowColumn>
        <TableRowColumn>{institute.name}</TableRowColumn>
        <TableRowColumn>{institute.country}</TableRowColumn>
        <TableRowColumn>{institute.status}</TableRowColumn>
      </TableRow>
      ))
    }
    </TableBody>
  </Table>
      </CenteredSection>
    );
  }
}

const TeamListQuery = gql`query TeamListQuery {
  allInstitutes {
    id name country status 
  }
}`

const TeamData = graphql(TeamListQuery)(InstituteTeamPage);

export default TeamData;

