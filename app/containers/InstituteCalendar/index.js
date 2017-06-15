/*
 *
 * InstituteCalendar
 *
 */

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux';
import EventForm from './EventForm';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import H3 from 'components/H3';
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
import CalendarView from 'containers/CalendarView'

export class InstituteCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showEventForm: false,
      showEventDetailDialog: false,
      activeIndex: 0
    }
  }

  toggleEventDetailDialog(value, index) {     
    this.setState({ showEventDetailDialog: !value, activeIndex: index})
    console.log('index', index);
  }

  toggleEventForm(value) {
    console.log('value', value);
      this.setState({ showEventForm: !value })
      this.props.data.refetch();
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
        onTouchTap={()=>this.toggleEventForm(this.state.showEventForm)}
      />
    ];

    const eventDetailactions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog)}
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
      <Notifications />
        <div>
          {this.state.showEventForm ? 
            <Dialog
                title="Create Event"
                autoScrollBodyContent={true}
                actions={actions}
                modal={false}
                titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
                open={this.state.showEventForm}
                onRequestClose={()=>this.toggleEventForm(this.state.showEventForm)}
              >
                <EventForm instituteId={this.props.instituteId} toggleEventForm={(value)=>this.toggleEventForm(value)}/> 
            </Dialog>
            : <RaisedButton style={{"float": "right","marginTop": "10px","marginRight": "10px"}} label="Add New Event" onClick={() => this.toggleEventForm(this.state.showEventForm)} primary={true} />}
        </div>
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
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Name</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>address</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Start Date</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>End Date</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Number of Teams</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Number of Matches</TableHeaderColumn>
        <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>View Detail</TableHeaderColumn>
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
        <RaisedButton label="View Detail" onTouchTap={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog, index)} primary={true} />
        </TableRowColumn>
      </TableRow>
      ))
    }
    </TableBody>
  </Table>
  <Dialog
          title="Event Details"
          autoScrollBodyContent={true}
          actions={eventDetailactions}
          modal={false}
          autoDetectWindowHeight={true}
          open={this.state.showEventDetailDialog}
          onRequestClose={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog)}
        >
          <CalendarView activeTeam={this.props.data.allEvents[this.state.activeIndex]} />
        </Dialog>
      </CenteredSection>
      </div>
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
  })(InstituteCalendar);

export default InstituteEventsData;

