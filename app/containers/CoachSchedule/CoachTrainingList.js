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

export class CoachTrainingList extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
        <TableHeaderColumn>Training Session</TableHeaderColumn>
        <TableHeaderColumn>Date</TableHeaderColumn>
        <TableHeaderColumn>Time</TableHeaderColumn>
        <TableHeaderColumn>Team</TableHeaderColumn>
        <TableHeaderColumn>Location</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.data.allTrainings.map((team, index)=>(
      <TableRow key={team.id}>
        <TableRowColumn>{index+1}</TableRowColumn>
        <TableRowColumn>
        {team.trainingDates.length > 0 ?
          team.trainingDates.map(trainingDate =>
        <div key={trainingDate.id}>{trainingDate.date}</div>) : ''}
        </TableRowColumn>
         <TableRowColumn>
        {team.trainingDates.length > 0 ?
          team.trainingDates.map(trainingDate =>
        <div key={trainingDate.id}>{trainingDate.date}</div>) : ''}
        </TableRowColumn>
        <TableRowColumn>{team.address}</TableRowColumn>
        <TableRowColumn>{team.address}</TableRowColumn>


      </TableRow>
      ))
    }
    </TableBody>
  </Table>
      </CenteredSection>
    );
  }
}

const userId = localStorage.getItem('userID');
console.log("userId",userId)
const TeamListQuery = gql`query TeamListQuery{
   allTrainings(
    filter:{
      coach:{
        id: "cj32wk6prqm2v01929uytsrez"
      }
    }
  ){
    id
    dateTime
    address
    numberOfSessions
    coach{ id user{ id email firstName lastName } }
    institute{ id name }
    trainingTeams{ team{ id name } }
    trainingDates{ id date }
  }
}`

const TeamData = graphql(TeamListQuery)(CoachTrainingList);

export default TeamData;
