import React from 'react';
import H3 from 'components/H3';
import InstituteForm from './InstituteForm';
import RaisedButton from 'material-ui/RaisedButton';
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
import Notifications, {notify} from 'react-notify-toast';
import Loading from 'components/LoadingIndicator';


class InstituteListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showInstituteForm: false
    }
  }

  toggleInstituteForm(value) {
    this.setState({ showInstituteForm: !value })
    this.props.data.refetch();
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={()=>this.toggleInstituteForm(this.state.showInstituteForm)}
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
      <Notifications />
        <div>
          <RaisedButton style={{"float": "right","marginTop": "10px","marginRight": "10px"}} label="Add New Institute" onClick={() => this.toggleInstituteForm(this.state.showInstituteForm)} primary={true} />
          <Dialog
              title="Add Institute"
              autoScrollBodyContent={true}
              actions={actions}
              modal={false}
              titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
              open={this.state.showInstituteForm}
              onRequestClose={()=>this.toggleInstituteForm(this.state.showInstituteForm)}
            >
              <InstituteForm toggleInstituteForm={(value)=>this.toggleInstituteForm(value)}/>
          </Dialog>
        </div>
        <div style={{"float": "left","marginLeft": "50px","marginRight": "50px","marginBottom": "50px"}}>
           <Table 
            height={"350px"}
            fixedHeader={true}
            selectable={false}
            multiSelectable={false}>
            <TableHeader 
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
              >
              <TableRow>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>ID</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Name</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Country</TableHeaderColumn>
                <TableHeaderColumn style={{fontSize:"18px",textAlign: 'center'}}>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody 
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              >
            {this.props.data.allInstitutes.map(institute=>(
              <TableRow key={institute.id}>
                <TableRowColumn style={{textAlign: "center"}}>{institute.id}</TableRowColumn>
                <TableRowColumn style={{textAlign: "center"}}>{institute.name}</TableRowColumn>
                <TableRowColumn style={{textAlign: "center"}}>{institute.country}</TableRowColumn>
                <TableRowColumn style={{textAlign: "center"}}>{institute.status}</TableRowColumn>
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


const InstituteQuery = gql`query InstituteQuery {
  allInstitutes {
    id name country status 
  }
}`

const InstituteData = graphql(InstituteQuery)(InstituteListPage);

export default InstituteData;
