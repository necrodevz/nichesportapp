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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TeamDetailModal from './TeamDetailModal'

export class CoachTeamPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state={
      showTeamDetailDialog: false,
      activeIndex: 0
    }
  }

  toggleTeamDetailDialog(value, index) {     
    this.setState({ showTeamDetailDialog: !value, activeIndex: index})
    console.log('index', index);
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleTeamDetailDialog(this.state.showTeamDetailDialog)}
      />
    ];
    
    if (this.props.TeamsList.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.TeamsList.error) {
    console.log(this.props.TeamsList.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <CenteredSection>
      <Dialog
          title="Team Info"
          autoScrollBodyContent={true}
          actions={actions}
          modal={false}
          autoDetectWindowHeight={true}
          open={this.state.showTeamDetailDialog}
          onRequestClose={()=>this.toggleTeamDetailDialog(this.state.showTeamDetailDialog)}
        >
          <TeamDetailModal activeTeam={this.props.TeamsList.allTeams[this.state.activeIndex]} />
        </Dialog>
         <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Season</TableHeaderColumn>
        <TableHeaderColumn>Age Group</TableHeaderColumn>
        <TableHeaderColumn>No. of Athetes</TableHeaderColumn>
        <TableHeaderColumn>View Team Detail</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.TeamsList.allTeams.map((team, index)=>(
      <TableRow key={team.id}>
        <TableRowColumn>{index+1}</TableRowColumn>
        <TableRowColumn>{team.name}</TableRowColumn>
        <TableRowColumn>{team.season}</TableRowColumn>
        <TableRowColumn>{team.ageGroup}</TableRowColumn>
        <TableRowColumn>{team.totalNumberOfAthelets}</TableRowColumn>
        <TableRowColumn>
        <RaisedButton label="View Detail" onTouchTap={()=>this.toggleTeamDetailDialog(this.state.showTeamDetailDialog, index)} primary={true} />
        </TableRowColumn>
      </TableRow>
      ))
    }
    </TableBody>
  </Table>
      </CenteredSection>
    );
  }
}

export default CoachTeamPage;
