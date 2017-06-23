import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form/immutable';
import {RadioButton} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import {
  SelectField,
  TextField
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Notifications, {notify} from 'react-notify-toast';
import {GridList, GridTile} from 'material-ui/GridList';
import Dropzone from 'react-dropzone';

var videoPrivacyList = [{"id": 1, "value": "PUBLIC"}, {"id": 2, "value": "PRIVATE"}];

const errors = {}

// validation functions
const required = value => (value == null ? 'Required' : undefined);

const validate = values => {
  errors.videoDescription = required(values.videoDescription)
  errors.videoTitle = required(values.videoTitle)
  errors.videoType = required(values.videoType)
  errors.videoPrivacy = required(values.videoPrivacy)

  return errors
}

class AddVideo extends Component {
  static propTypes = {
    addVideo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state={
      videoUrl: '',
      videoId: ''
    }
  }

    onDrop = (files) => {
    // prepare form data, use data key!
    let data = new FormData()
    data.append('data', files[0])

    // use the file endpoint
    fetch('https://api.graph.cool/file/v1/cj32ti8u8khzz0122jd4cwzh6', {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(video => {
      this.setState({
        videoId: video.id,
        videoUrl: video.url,
      })
    })
  }

  handlePost = async () => {
    const {videoUrl, videoId} = this.state
    await this.props.addVideo({variables: { description: this.props.videoDescription ,
           videoId: videoId,
           userId: this.props.userId,
           videoUrl: videoUrl,
           videoPrivacy: this.props.videoPrivacy,
           videoType: this.props.videoType,
           videoTitle: this.props.videoTitle }}).then(()=>notify.show('Video Uploaded', 'success')).then(()=>this.props.toggleVideoForm('false')).catch((res)=>notify.show(JSON.stringify(res.message), 'error'))
  }

  render() {
    const {loading, error, repos, handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <Notifications/>
      <GridList cols={2} cellHeight={90} padding={1}>
        <GridTile>
        <Field
            name="videoTitle"
            component={TextField}
            hintText="Video Title"
            floatingLabelText="Video Title"
            validate={required}
          />
          </GridTile>
          <GridTile>
          <Field
            name="videoDescription"
            component={TextField}
            hintText="Video Description"
            floatingLabelText="Video Description"
            validate={required}
          />
          </GridTile>
          <GridTile>
          <Field
            name="videoPrivacy"
            component={SelectField}
            hintText="Video Privacy"
            style={{"textAlign":"left"}}
            floatingLabelText="Video Privacy"
            validate={required}
          >
            {videoPrivacyList.map(privacy => (<MenuItem value={privacy.value} primaryText={privacy.value} key={privacy.id} />))}
          </Field>
        </GridTile>
        <GridTile>
          <Field
            name="videoType"
            component={SelectField}
            hintText="Video Type"
            style={{"textAlign":"left"}}
            floatingLabelText="Video Type"
            validate={required}
          >
            {this.props.videoTypeList ? this.props.videoTypeList.map(type => (<MenuItem value={type.value} primaryText={type.value} key={type.id} />)) : ''}
          </Field>
        </GridTile>
      </GridList>
      {!this.state.videoId &&
          <Dropzone
            onDrop={this.onDrop}
            accept='video/*'
            multiple={false}
          >
            <div>Drop a video or click to choose</div>
          </Dropzone>}
          {this.state.videoUrl &&
            <video autoPlay="true" controls="true" width="70%" style={{width: '70%'}} src={this.state.videoUrl} role='presentation' />
          }
          {this.state.description && this.state.videoUrl &&
            <button onClick={this.handlePost}>Post</button>
          }
      <GridList cols={1} cellHeight={90} padding={1}>
        <GridTile style={{textAlign: "center",paddingTop:"20px"}}>
          <RaisedButton label="Submit" disabled={errors.videoDescription != null || errors.videoDescription != null || errors.videoPrivacy != null || errors.videoType != null || this.state.videoId == '' } onTouchTap={()=>this.handlePost()} primary={true} />
        </GridTile>
      </GridList>
      </form>
    );
  }
}

const selector = formValueSelector('AddVideo');

AddVideo = connect(state => ({
  videoDescription: selector(state, 'videoDescription'),
  videoTitle: selector(state, 'videoTitle'),
  videoType: selector(state, 'videoType'),
  videoPrivacy: selector(state, 'videoPrivacy')
}))(AddVideo);

AddVideo = reduxForm({
  form: 'AddVideo',
  validate
})(AddVideo);

const addVideoMutation = gql` mutation addVideo ($videoTitle: String, $userId: ID, $videoUrl: String, $videoDescription: String, $videoPrivacy: VIDEO_PRIVACY, $videoType: VIDEO_TYPE ) {createVideo(
    title: $videoTitle
    userId: $userId
    url: $videoUrl
    type: $videoType
    description: $videoDescription
    privacy: $videoPrivacy
  )
   {
    id
  }
  }
`

const AddVideoMutation = compose(
  graphql(addVideoMutation, {name: 'addVideo'})
)(AddVideo)

export default AddVideoMutation;
