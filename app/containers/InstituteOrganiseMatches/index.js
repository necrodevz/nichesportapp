/*
 *
 * InstituteOrganiseMatches
 *
 */

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
import Notifications, {notify} from 'react-notify-toast';
import OrganiseMatch from './OrganiseMatch';
import Loading from 'components/LoadingIndicator';

export class InstituteOrganiseMatches extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showEventDetailDialog: false,
      activeIndex: 0
    }
  }

  toggleEventDetailDialog(value, index) {     
    this.setState({ showEventDetailDialog: !value, activeIndex: index})
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
        onTouchTap={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog)}
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
      <CenteredSection>
        <Notifications />
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
          <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Name</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Address</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Start Date</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>End Date</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Number of Teams</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Number of Matches</TableHeaderColumn>
          <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Organise</TableHeaderColumn>
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
            <TableRowColumn style={{textAlign: 'center'}}>{team.endDate}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{team.numberOfTeams}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{team.numberOfFixtures}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>
            <RaisedButton label="SemiFinal/Final" onTouchTap={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog, index)} primary={true} />
            </TableRowColumn>
          </TableRow>
          ))
        }
        </TableBody>
        </Table>
          <Dialog
            title="Organise SemiFinal/Final"
            autoScrollBodyContent={true}
            actions={actions}
            modal={false}
            open={this.state.showEventDetailDialog}
            onRequestClose={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog)}
          >
          <OrganiseMatch toggleEventDetailDialog={(value)=>this.toggleEventDetailDialog(value)} activeEvent={this.props.data.allEvents[this.state.activeIndex]} />
        </Dialog>
      </CenteredSection>
    );
  }
}

const InstituteEventsListQuery = gql`query InstituteEventsListQuery ($instituteId: ID){
   allEvents(
    filter:{
      institute:{
        id: $instituteId
      }
                }
  )
  {
    name
    id
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

const InstituteEventsData = graphql(InstituteEventsListQuery,{
  options: (props) => ({
      variables: {
        instituteId: props.instituteId }
    })
  })(InstituteOrganiseMatches);

export default InstituteEventsData;

