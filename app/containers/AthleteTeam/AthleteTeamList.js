/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
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


class AthleteTeamList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate() {
    return true;
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
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Season</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Coach</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Sport</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Age Group</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>No. of Athletes</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody 
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover={true}
          >
        {this.props.data.allTeams.map(team=>(
          <TableRow key={team.id}>
            <TableRowColumn style={{textAlign: 'center'}}>{team.name}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{team.season}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{team.coach.user.firstName} {team.coach.user.lastName}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{team.sport ? team.sport.name : 'Not Available'}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{team.ageGroup}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{team.totalNumberOfAthelets}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center',width: '200px'}}>{team.atheletTeams[team.atheletTeams.length-1].status}</TableRowColumn>
          </TableRow>
          ))
        }
        </TableBody>
  </Table>
      </div>
    );
  }
}


const MyTeamsQuery = gql`query MyTeamsQuery ($userId: ID) {
  allTeams(filter: {
    atheletTeams_some: {
      athlete: {
        user:{
          id: $userId
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

const InstituteData = graphql(MyTeamsQuery, {
  options: (props) => ({ pollInterval: 200000,
      variables: {
        userId: props.userId   }
    })
  })(AthleteTeamList);

export default InstituteData;
