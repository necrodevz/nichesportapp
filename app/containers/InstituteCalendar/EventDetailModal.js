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


export class EventDetailModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
      Event Detail VIew
      </div>
    );
  }
}

export default EventDetailModal;

