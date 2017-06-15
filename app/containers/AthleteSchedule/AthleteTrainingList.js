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

export class AthleteTrainingList extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
         <Table
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
        <TableHeaderColumn style={{textAlign: 'center'}}>Training Session</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Date</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Time</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Team</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Location</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody 
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover={true}
    >
    {this.props.data.allTrainings.map((team, index)=>(
      <TableRow key={team.id}>
        <TableRowColumn style={{textAlign: 'center'}}>{index+1}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
        {team.trainingDates.length > 0 ?
          team.trainingDates.map(trainingDate =>
        <div key={trainingDate.id}>{trainingDate.date}</div>) : ''}
        </TableRowColumn>
         <TableRowColumn style={{textAlign: 'center'}}>
        {team.trainingDates.length > 0 ?
          team.trainingDates.map(trainingDate =>
        <div key={trainingDate.id}>{trainingDate.date}</div>) : ''}
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{team.address}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{team.address}</TableRowColumn>


      </TableRow>
      ))
    }
    </TableBody>
  </Table>
      </CenteredSection>
    );
  }
}

const TrainingsListQuery = gql`query TrainingsListQuery ($userId: ID) {
   allTrainings(
    filter:{
      trainingTeams_some:{
        team:{
          atheletTeams_some:{
              status_in:[APPROVEDBYATHLETE APPROVEDBYCOACH APPROVEDBYINSTITUTE]
                    athlete:{
                user:{
                  id: $userId
                }
              }
                  }
          }
        }
      }
  ){
    id
    dateTime
    address
    numberOfSessions
    coach{ id user{ id email firstName lastName } }
    institute{ id name }
    trainingTeams{ team{ id name atheletTeams{athlete{ user{id}} status }} }
    trainingDates{ id date }
  }
}`

const TrainingData = graphql(TrainingsListQuery, {
  options: (props) => ({ variables: { userId: props.userId } }),
})(AthleteTrainingList);

export default TrainingData;
