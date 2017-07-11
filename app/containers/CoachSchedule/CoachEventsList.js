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
import CalendarView from 'containers/CalendarView';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Loading from 'components/LoadingIndicator';

export class CoachEventsList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      showEventDetailDialog: false,
      activeIndex: 0
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  toggleEventDetailDialog(value, index) {     
    this.setState({ showEventDetailDialog: !value, activeIndex: index})
    console.log('index', index);
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
          <TableRow >
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Address</TableHeaderColumn>
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
                <TableRowColumn style={{textAlign: 'center'}}>{this.calculateTime(new Date(team.startDate))}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.calculateTime(new Date(team.endDate))}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{team.numberOfTeams}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{team.numberOfFixtures}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                <RaisedButton label="View Detail" onTouchTap={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog, index)} primary={true} />
            </ TableRowColumn>
          </TableRow>
          ))
        }
        </TableBody>
        </Table>
        <Dialog
            title="Event Details"
            autoScrollBodyContent={true}
            actions={actions}
            modal={false}
            autoDetectWindowHeight={true}
            open={this.state.showEventDetailDialog}
            onRequestClose={()=>this.toggleEventDetailDialog(this.state.showEventDetailDialog)}
        >
            <CalendarView activeTeam={this.props.data.allEvents[this.state.activeIndex]} />
        </Dialog>
      </CenteredSection>
    );
  }
}

const CoachEventsListQuery = gql`query CoachEventsListQuery ($userId: ID!){
   allEvents(
    filter:{
      teams_some:{
        team:{
            coach:{
              user:{
                id: $userId
              }
          }
        }
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

const CoachEventsData = graphql(CoachEventsListQuery,{
  options: (props) => ({
      variables: {
        userId: props.userId }
    })
  })(CoachEventsList);

export default CoachEventsData;
