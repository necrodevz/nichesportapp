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
      <div>
        <div >
        {this.state.showTeamForm ? <TeamForm showTeamForm={this.state.showTeamForm} toggleTeamForm={this.toggleTeamForm}/> : <RaisedButton  label="Add New Team" style={{"float": "right","margin-top": "10px","margin-right": "10px"}} onClick={() => this.toggleTeamForm(this.state.showTeamForm)} primary={true} />}
        </div>
        <div style={{"float": "left"}}>
        <Table>
    <TableHeader displaySelectAll= {false}>
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Coach</TableHeaderColumn>
        <TableHeaderColumn>Season Hired</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.data.allTeams.map(institute=>(
      <TableRow key={institute.id}>
        <TableRowColumn>{institute.name}</TableRowColumn>
        <TableRowColumn>{institute.coach.user.firstName} {institute.coach.user.lastName}</TableRowColumn>
        <TableRowColumn>{institute.season}</TableRowColumn>
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

const TeamListQuery = gql`query TeamListQuery($userID: ID!) {
    allTeams(filter: {institute:{ owner:{id: $userID }} }) {
    id
    name
    season
    ageGroup
    totalNumberOfAthelets
    createdAt
    sport { id name }
    coach { id user { id email firstName lastName }}
    manager { id user { id email firstName lastName }}
  }
}`

const userId = localStorage.getItem('userID');
const TeamData = graphql(TeamListQuery, {
  options: {
      variables: {
        userID: userId
      }
    }
  })(InstituteTeamPage);

export default TeamData;

