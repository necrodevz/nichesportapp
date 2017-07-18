/*
 *
 * InstituteTeamPage
 *
 */
import React from 'react';
import TeamForm from './TeamForm';
import RaisedButton from 'material-ui/RaisedButton';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Loading from 'components/LoadingIndicator';

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
    this.props.data.refetch()
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleTeamForm(this.state.showTeamForm)}
      />
    ];

  if (this.props.data.loading) {
    return (<Loading />)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <div>
        <div >
          {this.state.showTeamForm ?
            <Dialog
                title="Create Team"
                autoScrollBodyContent={true}
                actions={actions}
                modal={false}
                titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
                open={this.state.showTeamForm}
                onRequestClose={()=>this.toggleTeamForm(this.state.showTeamForm)}
              >
                <TeamForm instituteId={this.props.instituteId} toggleTeamForm={(value) => this.toggleTeamForm(value)}/>
            </Dialog>
          : <RaisedButton  label="Create Team" style={{"float": "right","marginTop": "10px","marginRight": "10px"}} onClick={() => this.toggleTeamForm(this.state.showTeamForm)} primary={true} />}
        </div>
        <div style={{"float": "left","marginLeft": "50px","marginRight": "50px","marginBottom": "50px"}}>
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
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Coach</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Season Hired</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Sport</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody 
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover={true}
      >
    {this.props.data.allTeams.map(institute=>(
      <TableRow key={institute.id}>
        <TableRowColumn style={{textAlign: 'center'}}>{institute.name}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{institute.coach.user.firstName} {institute.coach.user.lastName}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{institute.season}</TableRowColumn>
        {institute.sport != null ?
        <TableRowColumn style={{textAlign: 'center'}}>{institute.sport.name}</TableRowColumn> : <TableRowColumn style={{textAlign: 'center'}}>NA</TableRowColumn>}

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

