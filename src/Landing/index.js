import React, {Component} from 'react'
import logo from './logo.png'
import bg from './bg.png'
import {Card, CardMedia} from 'material-ui/Card'
//import {Grid, Row, Col} from 'react-flexbox-grid'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'
import {openModal, formUpdate} from '../actions'
import FormWithDataAndMutations from './Form'
import * as types from '../constants'

const Header = ({handleOpen}) =>
    {
        
        
        return(
            <AppBar
                title='Athliche App Coming Soon'
                iconElementLeft={<img src={logo} height='50px' />}
                iconElementRight={<FlatButton  label='Get Notified!' onTouchTap={handleOpen} primary={true} />}
            />
        )
        
    }

class Landing extends Component  
{
    constructor(props){
        super(props)
        
        this.handleSave = this.handleSave.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.checkEntityType = this.checkEntityType.bind(this)
    }
    styles = {
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    handleSave=()=>{
        this.fields = {...this.props.mailing}
        console.log(this.fields)
    }
    
    handleOpen = () => {
        this.props.dispatch(openModal())
    }
    handleChange =(e) => 
    {
        this.payload = {
            id: e.target.id,
            value: e.target.value
        }
        this.props.dispatch(formUpdate(this.payload))
    }
    
    checkEntityType = () => 
    {
      if(this.props.mailing.entityType == 'team' || 'institution')
      {
        return true
      }
    }
    
    render(){
        return(
            <div>
                <Header handleOpen={this.handleOpen} />
                <Card>
                    <CardMedia >
                        <img src={bg} />
                    </CardMedia>
                </Card>
                <Dialog
                actions={<FlatButton label='Submit' onTouchTap={this.handleSave} />}
                open={this.props.mailing.isOpen}
                modal={true}
                title="Enter your email address"
                >
                    <FormWithDataAndMutations styles={this.styles} mailing={this.props.mailing} checkEntityType={this.checkEntityType} handleChange={this.handleChange} />
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) =>
{
  return {
    mailing: state.mailing
  }
}


export default connect(mapStateToProps)(Landing)


//export default Landing