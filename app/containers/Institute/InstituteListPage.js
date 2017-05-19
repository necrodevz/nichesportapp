/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import H3 from 'components/H3';
import messages from './messages';
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


class InstituteListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showInstituteForm: false
    }
  }

  toggleInstituteForm(value) {
    console.log('value', value);
      this.setState({ showInstituteForm: !value })
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return true;
  }

  render() {
      if (this.props.data.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }
    return (
      <CenteredSection>
        <Helmet
          title="Institute List Page"
          meta={[
            { name: 'description', content: 'Feature page of Institute' },
          ]}
        />
        <H3>Hey , there are {this.props.data.allInstitutes.length} Institutes in your account</H3>
        {this.state.showInstituteForm ? <InstituteForm showInstituteForm={this.state.showInstituteForm} toggleInstituteForm={this.toggleInstituteForm}/> : <RaisedButton label="Add New Institute" onClick={() => this.toggleInstituteForm(this.state.showInstituteForm)} primary={true} />}
         <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Country</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
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
