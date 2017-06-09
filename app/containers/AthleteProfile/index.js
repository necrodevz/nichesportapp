/*
 *
 * AthleteProfile
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import H2 from 'components/H2';
import CenteredSection from '../../containers/HomePage/CenteredSection';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import FontIcon from 'material-ui/FontIcon';
import AthleteProfileForm from './AthleteProfileForm';

export class AthleteProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      User: React.PropTypes.object,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state={
      athleteProfileData: {}
    }
  }

  render() {
     if (this.props.data.loading) {
    return (<div>Loading</div>)
  }

  if (this.props.data.error) {
    console.log(this.props.data.error)
    return (<div>An unexpected error occurred</div>)
  }

  const initialValues={athlete_first_name: 'Jhon' };

  this.props.data.user ? console.log('data------', this.props.data.user) : '';

    return (
      <section style={{"marginLeft":"30px"}}>
      <H2>My Account</H2>
       {this.props.data.user ? <AthleteProfileForm userData={this.props.data.user ? this.props.data.user : [] } sportsList={this.props.sportsList.allSports ? this.props.sportsList.allSports : [] }/> : ''}
      </section>
    );
  }
}

AthleteProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

AthleteProfile.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ])
};

const athleteQuery = gql`query athleteQuery {
   user { id firstName lastName email country dob profileImage gender address timeZone mobileNumber height weight bio createdAt
    athlete {
      id graduation graduationProgramLength graduationUniversity graduationYear hightSchool hightSchoolUniversity hightSchoolYear createdAt
      athleteSports {
        id
        sport { id }
        participateStartDate
        athleteAcadmicCertificates { id url }
      }
      athletAcadmic { id
        athlete { id }
        institute { id }
        sport { id }
        createdAt
      }
    }
  }
}`

const GetSportsQuery = gql`query GetSportsQuery {
  allSports {
    id
    name
  }
}`


const AthleteProfileData = compose(
  graphql(athleteQuery),
  graphql(GetSportsQuery, {name: 'sportsList'} ))(AthleteProfile);


export default (AthleteProfileData);
