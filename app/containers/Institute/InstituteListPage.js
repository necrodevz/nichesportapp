/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import messages from './messages';
import InstituteForm from './InstituteForm'
import RaisedButton from 'material-ui/RaisedButton'
import CenteredSection from '../../containers/HomePage/CenteredSection';

export default class InstituteListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    return (
      <CenteredSection>
        <Helmet
          title="Institute List Page"
          meta={[
            { name: 'description', content: 'Feature page of Institute' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        {this.state.showInstituteForm ? <InstituteForm showInstituteForm={this.state.showInstituteForm} toggleInstituteForm={this.toggleInstituteForm}/> : <RaisedButton label="Add New Institute" onClick={() => this.toggleInstituteForm(this.state.showInstituteForm)} primary={true} />}
      </CenteredSection>
    );
  }
}
