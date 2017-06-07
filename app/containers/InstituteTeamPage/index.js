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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleTeamForm(this.state.showTeamForm)}
      />
    ];

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
                <TeamForm showTeamForm={this.state.showTeamForm} toggleTeamForm={this.toggleTeamForm}/>
            </Dialog>
          : <RaisedButton  label="Create Team" style={{"float": "right","margin-top": "10px","margin-right": "10px"}} onClick={() => this.toggleTeamForm(this.state.showTeamForm)} primary={true} />}
        </div>
        <div style={{"float": "left","margin-left": "50px","margin-right": "50px","margin-bottom": "50px"}}>
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
        <TableHeaderColumn style={{textAlign: 'center'}}>Name</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Coach</TableHeaderColumn>
        <TableHeaderColumn style={{textAlign: 'center'}}>Season Hired</TableHeaderColumn>
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

