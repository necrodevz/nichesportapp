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

export class AthleteUpcomingEventList extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
      <TableRow >
        <TableHeaderColumn style={{textAlign: 'center'}}>Name</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>address</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Start Date</TableHeaderColumn>        
      </TableRow>
    </TableHeader>
    <TableBody 
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover={true}
    >
    {this.props.data.allEvents.map((team, index)=>(
      <TableRow key={index+1} >
        <TableRowColumn style={{textAlign: 'center'}}>{index+1}. {team.name}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{team.address}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{team.startDate}</TableRowColumn>

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
let dateString = new Date();
dateString = dateString.toISOString()
console.log("userId",userId)
const TeamListQuery = gql`query($userId : ID!){
  allEvents(
    filter:{
      endDate_gt:"0017-05-24T14:03:49.000Z"
      teams_some:{
        team:{
          atheletTeams_some:{
            status_in:[APPROVEDBYATHLETE APPROVEDBYCOACH APPROVEDBYINSTITUTE]
            athlete:{
              user:{
                id:$userId
              }
            }
          }
        }
      }
    }
  )
  {
    name
    institute{ id owner{ id email firstName lastName } }
    sport{ id name }
    numberOfFixtures
    numberOfTeams
    numberOfMatches
    address
    startDate
    endDate
    time
    coach{ id user{ id email firstName lastName } }
    type
  }
}`

const TeamData = graphql(TeamListQuery,{
  options: {
      variables: {
        userId: userId      }
    }
  })(AthleteUpcomingEventList);

export default TeamData;
