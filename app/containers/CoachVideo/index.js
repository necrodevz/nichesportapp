/*
 *
 * CoachVideo
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';

import H2 from 'components/H2';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';

import RaisedButton from 'material-ui/RaisedButton'
import { withApollo } from 'react-apollo';
import CenteredSection from '../../containers/HomePage/CenteredSection'
import { graphql, compose } from 'react-apollo'
import IconButton from 'material-ui/IconButton';
import gql from 'graphql-tag'
import SearchIcon from 'material-ui/svg-icons/action/search';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router'
import Notifications, {notify} from 'react-notify-toast';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AddVideoForm from './AddVideoForm'
var _ = require('lodash');

const style = {
  height: 300,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
var videoTypeList = [{"id": 1, "value": "GAME"} , {"id": 2, "value": "PRACTICE"}, {"id": 3, "value": "SCOUT"}, {"id": 4, "value": "PLAYLIST"}];

const errors = {}

const required = value => (value == null ? 'Required' : undefined);
// validation functions
const validate = values => {

  errors.searchVideo = required(values.searchVideo)
  return errors
}

export class CoachVideo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      showVideoForm: false,
      searchEnabled: false,
      searchData: [],
      searchText: '',
      value: 0,
    }
  }

  submitSearchVideos () {
    var filterData = _.filter(this.props.VideosList.allVideos, { 'type': this.state.searchText });
    this.setState({searchData: filterData, searchEnabled: true});
  }

  handleChange = (event, index, value) => this.setState({value: value, searchText: videoTypeList[value-1].value});

  resetSearch () {
    this.setState({searchEnabled: false, searchData: [], searchText: '', value: 0});
  }

  toggleVideoForm(value) {
    console.log('value', value);
      this.setState({ showVideoForm: !value })
    this.props.VideosList.refetch();
    this.resetSearch();
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
        onTouchTap={()=>this.toggleVideoForm(this.state.showVideoForm)}
      />
    ];
    const {loading, error, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <CenteredSection>
      <H2>
      <Notifications />
      <Dialog
                title="Add Video"
                autoScrollBodyContent={true}
                actions={actions}
                modal={false}
                titleStyle={{"background":"rgb(0, 188, 212)","color":"white"}}
                open={this.state.showVideoForm}
                onRequestClose={()=>this.toggleVideoForm(this.state.showVideoForm)}
              >
                <AddVideoForm userId={this.props.userId} showVideoForm={this.state.showVideoForm} toggleVideoForm={(value)=>this.toggleVideoForm(value)}/>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <div>
          <SelectField
            onChange={this.handleChange}
            hintText="Search By Video Type"
            fullWidth={true}
            value={this.state.value}
            style={{"textAlign":"left"}}
            floatingLabelText="Search By Video Type"
            validate={required}
          >
            {videoTypeList.map(type => (<MenuItem value={type.id} primaryText={type.value} key={type.id} />))}
          </SelectField>
        </div>
        <div>
          <IconButton onTouchTap={()=>this.submitSearchVideos()} disabled={this.state.searchText == ''}>
          <SearchIcon />
        </IconButton>
          <RaisedButton label="Reset Search" disabled={!this.state.searchEnabled} onTouchTap={()=>this.resetSearch()} secondary={true} />
        </div>
      </form>
      <RaisedButton  label="Add Video" style={{"float": "right","marginTop": "10px","marginRight": "10px"}} onClick={() => this.toggleVideoForm(this.state.showVideoForm)} primary={true} />
      </H2>
      {this.props.VideosList.allVideos && !this.state.searchEnabled ? this.props.VideosList.allVideos.map((video,index)=>(
      <Paper  style={style} zDepth={3} key={video.id}>
        <h3>Title: {video.title}</h3>
        <h4>
        <div>Type: {video.type}</div>
         {video.description ? <div>Description: {video.description}</div> : ''}
         <br/>
         <video controls="true" width="100%" style={{width: '100%'}} src={video.url} role='presentation' />
        </h4>
      </Paper>)) : ''}
      {this.state.searchData.length > 0 && this.state.searchEnabled ? this.state.searchData.map((video,index)=>(
      <Paper  style={style} zDepth={3} key={video.id}>
        <h3>Title: {video.title}</h3>
        <h4>
        <div>Type: {video.type}</div>
         {video.description ? <div>Description: {video.description}</div> : ''}
         <br/>
         <video controls="true" width="100%" style={{width: '100%'}} src={video.url} role='presentation' />
        </h4>
      </Paper>)) : ''}
      </CenteredSection>
    );
  }
}

const userId = localStorage.getItem('userID');

const getAllVideos = gql`query getAllVideos($userId: ID) {
  allVideos(
    filter:{
      user:{
        id: $userId
      }
    }
  ){
    id
    title
    user{
      id
    }
    url
    type
    description
    location
    privacy
  }
}`

const selector = formValueSelector('searchVideoForm');

CoachVideo = connect(state => ({
  searchText: selector(state, 'searchVideo')
}))(CoachVideo);

CoachVideo = reduxForm({
  form: 'searchVideoForm',
  validate
})(CoachVideo);

const CoachVideoMutation = compose(
  graphql(getAllVideos, { name: 'VideosList' }, {
  options: (props) => ({
      variables: {
        userId: props.userId   }
    })
  })
)(CoachVideo)

export default CoachVideoMutation;