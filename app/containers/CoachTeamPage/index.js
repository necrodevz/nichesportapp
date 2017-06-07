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
      <div>
        <div>
        <Dialog
            title="Team Info"
            autoScrollBodyContent={true}
            actions={actions}
            modal={false}
            autoDetectWindowHeight={true}
            titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
            open={this.state.showTeamDetailDialog}
            onRequestClose={()=>this.toggleTeamDetailDialog(this.state.showTeamDetailDialog)}
          >
            <TeamDetailModal activeTeam={this.props.TeamsList.allTeams[this.state.activeIndex]} />
          </Dialog>
        </div>
        <div style={{"margin":"50px"}}>
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
                <TableHeaderColumn style={{textAlign: 'center'}}>ID</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Season</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>Age Group</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>No. of Athetes</TableHeaderColumn>
                <TableHeaderColumn style={{textAlign: 'center'}}>View Team Detail</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              >
            {this.props.TeamsList.allTeams.map((team, index)=>(
              <TableRow key={team.id}>
                <TableRowColumn style={{textAlign: 'center'}}>{index+1}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{team.name}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{team.season}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{team.ageGroup}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{team.totalNumberOfAthelets}</TableRowColumn>
                <TableRowColumn>
                <RaisedButton label="View Detail" onTouchTap={()=>this.toggleTeamDetailDialog(this.state.showTeamDetailDialog, index)} primary={true} />
                </TableRowColumn>
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

export default CoachTeamPage;
