import React from 'react';
import H3 from 'components/H3';
import InstituteForm from './InstituteForm'
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


class InstituteListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showInstituteForm: false
    }
  }

  toggleInstituteForm(value) {
    this.setState({ showInstituteForm: !value })
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
    return (<div>Loading</div>)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <CenteredSection>
      <RaisedButton label="Add New Institute" onClick={() => this.toggleInstituteForm(this.state.showInstituteForm)} primary={true} />
      <Dialog
          title="Add Institute"
          autoScrollBodyContent={true}
          actions={actions}
          modal={false}
          open={this.state.showInstituteForm}
          onRequestClose={()=>this.toggleInstituteForm(this.state.showInstituteForm)}
        >
          <InstituteForm toggleInstituteForm={this.toggleInstituteForm}/>
        </Dialog>
         <Table>
    <TableHeader displaySelectAll= {false}>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Country</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.data.allInstitutes.map(institute=>(
      <TableRow key={institute.id}>
        <TableRowColumn>{institute.id}</TableRowColumn>
        <TableRowColumn>{institute.name}</TableRowColumn>
        <TableRowColumn>{institute.country}</TableRowColumn>
        <TableRowColumn>{institute.status}</TableRowColumn>
      </TableRow>
      ))
    }
    </TableBody>
  </Table>
      </CenteredSection>
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
