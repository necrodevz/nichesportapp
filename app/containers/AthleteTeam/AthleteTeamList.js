/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
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


class AthleteTeamList extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
      <Table>
        <TableHeader displaySelectAll= {false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Season</TableHeaderColumn>
            <TableHeaderColumn>Coach</TableHeaderColumn>
            <TableHeaderColumn>Sport</TableHeaderColumn>
            <TableHeaderColumn>Age Group</TableHeaderColumn>
            <TableHeaderColumn>No. of Athletes</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {this.props.data.allTeams.map(team=>(
          <TableRow key={team.id}>
            <TableRowColumn>{team.name}</TableRowColumn>
            <TableRowColumn>{team.season}</TableRowColumn>
            <TableRowColumn>{team.coach.user.firstName} {team.coach.user.lastName}</TableRowColumn>
            <TableRowColumn>{team.sport ? team.sport.name : 'Not Available'}</TableRowColumn>
            <TableRowColumn>{team.ageGroup}</TableRowColumn>
            <TableRowColumn>{team.totalNumberOfAthelets}</TableRowColumn>
            <TableRowColumn>{team.atheletTeams[0].status}</TableRowColumn>
          </TableRow>
          ))
        }
        </TableBody>
  </Table>
      </CenteredSection>
    );
  }
}


const MyTeamsQuery = gql`query MyTeamsQuery {
  allTeams(filter: {
    atheletTeams_some: {
      athlete: {
        user:{
          id:"cj32xcep62o910192e8cgl23s"
        }
      }
    }
  }
   ) {
    id
    atheletTeams{
      status
    }
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

const InstituteData = graphql(MyTeamsQuery)(AthleteTeamList);

export default InstituteData;
