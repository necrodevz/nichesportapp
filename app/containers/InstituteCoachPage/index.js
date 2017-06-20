/*
 *
 * InstituteCoachPage
 *
 */

import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CoachForm from './CoachForm';
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
import Loading from 'components/LoadingIndicator';


var userID = localStorage.getItem('userID');

export class InstituteCoachPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showCoachForm: false
    }
  }

  toggleCoachForm(value) {
    console.log('value', value);
    this.setState({ showCoachForm: !value });
    this.props.data.refetch();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleCoachForm(this.state.showCoachForm)}
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
      {this.state.showCoachForm ?
        <Dialog
            title="Create Coach"
            autoScrollBodyContent={true}
            actions={actions}
            modal={false}
            titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
            open={this.state.showCoachForm}
            onRequestClose={()=>this.toggleCoachForm(this.state.showCoachForm)}
          >
            <CoachForm instituteId={this.props.instituteId} toggleCoachForm={(value) => this.toggleCoachForm(value)}/>
        </Dialog>
       : <RaisedButton label="Create Coach" style={{"float": "right","marginTop": "10px","marginRight": "10px"}} onClick={() => this.toggleCoachForm(this.state.showCoachForm)} primary={true} />}
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
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Email</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>First Name</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Last Name</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover={true}
          >
        {this.props.data.allCoaches.map((coach, index)=>(
          <TableRow key={coach.id}>
            <TableRowColumn style={{textAlign: 'center'}}>{index+1}  {coach.user.email}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{coach.user.firstName}</TableRowColumn>
            <TableRowColumn style={{textAlign: 'center'}}>{coach.user.lastName}</TableRowColumn>
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

const GetCoachListQuery = gql`query GetCoachListQuery ($userID: ID!) {
  allCoaches(filter: {institute:{ owner:{id: $userID }} }) {
    id
    user { id email firstName lastName }
  }
}`

const CoachListData = graphql(GetCoachListQuery, {
  options: {
      variables: {
        userID: userID
      }
    }
  })(InstituteCoachPage);


export default CoachListData;
