import React from 'react';
import H3 from 'components/H3';
import RaisedButton from 'material-ui/RaisedButton';
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
import Loading from 'components/LoadingIndicator';

export class CoachTrainingList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    return true;
  }

  calculateTime(dateTime){
    let time = dateTime.toTimeString();
    let timeString = time.substring(0,9);
    let H = +timeString.substr(0, 2);
    let h = H % 12 || 12;
    let ampm = H < 12 ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    let date = dateTime.toDateString();
    let formattedDateTime = date + ', ' + timeString;
    return formattedDateTime;
  }

  render() {
      if (this.props.data.loading) {
    return (<Loading />)
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
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Training Session</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Date & Time</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Teams List</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Location</TableHeaderColumn>
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
        <div key={trainingDate.id}>{this.calculateTime(new Date(trainingDate.date))}</div>) : ''}
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
        {team.trainingTeams.length > 0 ?
          team.trainingTeams.map(trainingTeam =>
        <div key={team.id+trainingTeam.team.id+Math.random()*100000}>{trainingTeam.team.name}</div>) : 'Not Available'}
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{team.address ? team.address : 'Not Available'}</TableRowColumn>


      </TableRow>
      ))
    }
    </TableBody>
  </Table>
      </CenteredSection>
    );
  }
}

const CoachTrainingListQuery = gql`query CoachTrainingListQuery($userId: ID!){
   allTrainings(
    filter:{
      coach:{
        user: {
        id: $userId
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
    trainingTeams{ team{ id name } }
    trainingDates{ id date }
  }
}`

const CoachTrainingData = graphql(CoachTrainingListQuery,{
  options: (props) => ({
      variables: {
        userId: props.userId      }
    })
  })(CoachTrainingList);

export default CoachTrainingData;
