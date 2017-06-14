/*
 *
 * EventDetailModal
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import RaisedButton from 'material-ui/RaisedButton';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import Notifications, {notify} from 'react-notify-toast';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {GridList, GridTile} from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import localizer from 'react-big-calendar/lib/localizers/globalize';
import globalize from 'globalize';
import BigCalendar from 'react-big-calendar';
require('react-big-calendar/lib/css/react-big-calendar.css');
import Snackbar from 'material-ui/Snackbar';
//import 'react-big-calendar/lib/less/styles.less';
// import './styles.less';
// import './prism.less';

localizer(globalize);

const bodyStyle = {
  top: 0
};

const allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

export class EventDetailModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.state={
      eventsList: [],
      open: false,
      message: {}
    }
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    let data = [];
    nextProps.data.allEventDates.length > 0 ?
    nextProps.data.allEventDates.map((event,index)=>(
      data.push({'title': event.matchType + ' ' + event.teamA.name + ' vs ' + event.teamB.name, 'start': new Date(event.date), 'end': new Date(event.date)})
    )) : '';
    this.setState({eventsList: data})
  }

  handleSelectEvent() {
    this.setState({message: arguments[0], open: true})
  }

  render() {
    if (this.props.data.loading) {
    return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    const message = this.state.message;

    return (
      this.state.eventsList.length > 0 ?
        <div>
        <Snackbar
        style={bodyStyle}
          open={this.state.open}
          message={message.start ? message.title+ ' at '+ message.start.getDate() + '/' + message.start.getMonth() + '/' + message.start.getFullYear()  + ' ' + message.start.getHours() + ':' + message.start.getMinutes() + ':' + message.start.getSeconds() : ''}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <BigCalendar
        selectable={true}
        popup={true}
        {...this.props}
        events={this.state.eventsList}
        onSelectEvent={this.handleSelectEvent}
        style={{height: "400px", width: "100%"}}
        views={allViews}
        defaultDate={new Date(this.state.eventsList[0].start)}
      /></div> : <div>Loading</div>
    );
  }
}

const eventDetailsQuery = gql`query eventDetailsQuery ($eventId: ID){
   allEventDates(filter: { event:{ id: $eventId } }
  )
  {
    id teamA { id name } teamB { id name } matchType date
  }
}`

const eventDetailData = graphql(eventDetailsQuery,{
  options: (props) => ({
      variables: {
        eventId: "cj3vqczyqasdv0163hhni517p" }
    })
  })(EventDetailModal);

export default eventDetailData;

