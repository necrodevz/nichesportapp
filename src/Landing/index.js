import React, {Component} from 'react'
import logo from './logo.png'
import bg from './bg.png'
import {Card, CardMedia} from 'material-ui/Card'
import Drawer from 'material-ui/Drawer'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux'
import {toggleDialog, toggleDrawer} from '../actions'
import Form from './Form'
import * as types from '../constants'
import {Row} from 'react-flexbox-grid'
import modalContent from './modal.png'

const Header = ({handleOpen, isOpen}) =>
    {
        return(
            <AppBar
                title='Athliche App Coming Soon'
                iconElementLeft={<img src={logo} height='50px' />}
                iconElementRight={<RaisedButton  label={isOpen ?'Close Form':'Get Notified!'} onTouchTap={handleOpen} />}
            />
        )
        
    }
    
const Intro = ({isOpen, handleClick}) =>
    {
        
        const actions = [
                <Row center='xs'>
                    <RaisedButton
                        label='Sign Up!'
                        onTouchTap={handleClick}
                        primary={true}
                    />
                </Row>
            ]
        return(
            <Dialog 
                title={
                    <Row center='xs'>
                        <img src={logo} height='50px' />
                    </Row>
                }
                actions={actions}
                modal={true}
                open={isOpen}
            >
                <Row middle='xs' center='xs'>
                    <img src={modalContent} role='presentation' />
                </Row>
            </Dialog>
        )
    }

class Landing extends Component  
{
    constructor(props){
        super(props)
        
        this.handleSave = this.handleSave.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleInfo = this.handleInfo.bind(this)
    }
    styles = {
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    handleSave = (values) => {
        //preventDefault()
        console.log(values)
        this.props.dispatch(toggleDialog())
    }
    handleInfo = () => {
        this.props.dispatch(toggleDialog())
        this.props.dispatch(toggleDrawer())
    }
    handleOpen = () => {
        this.props.dispatch(toggleDialog())
    }
    
    render(){
        return(
            <div>
                <Header handleOpen={this.handleOpen} isOpen={this.props.mailing.isOpen} />
                <Card>
                    <CardMedia >
                        <img src={bg} />
                    </CardMedia>
                </Card>
                <Intro isOpen={this.props.mailing.dialogOpen} handleClick={this.handleInfo} />
                <Drawer
                open={this.props.mailing.drawerOpen}
                title="Enter your email address"
                >
                    <Form mailing={this.props.mailing}  onSubmit={this.handleSave} />
                </Drawer>
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