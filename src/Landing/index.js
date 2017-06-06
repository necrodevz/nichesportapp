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
import {Row, Col} from 'react-flexbox-grid'
import modalContent from './modal.png'
import { gql, graphql, compose } from 'react-apollo'
import CountdownTimer from 'react-cntdwn' 
import './marquee.css'

const Header = ({handleOpen, isOpen}) =>
    {
        return(
            <AppBar
                title='Athliche App Coming Soon'
                iconElementLeft={<img src={logo} height='50px' />}
                iconElementRight={<RaisedButton  label={isOpen ?'Close Form':'Get Notified!'} onTouchTap={handleOpen} />}
                static
            />
        )
        
    }
    
const Intro = ({isOpen, handleClick}) =>
    {
        
        const actions = [
                <Row center='xs'>
                    <RaisedButton
                        label='Get notified when Athliche becomes available!'
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
                modal={false}
                open={isOpen}
            >
                <Row middle='xs' center='xs'>
                    <img src={modalContent} role='presentation' />
                </Row>
            </Dialog>
            
        )
    }
    
const Ticker = ({news}) => 
{
    return(
        <h2 className='marquee'><span>{news}</span></h2>
    )
}

const Timer = ({endDate}) =>
{
    return(
        <Row centered>
            <h2>Time to Launch</h2>
            <br />
            <h3>
                <CountdownTimer
                    targetDate={new Date(endDate)}
                    interval={1000}
                    timeSeparator={':'}
                    leadingZero
                    format={{
                        day: 'DD',
                        hour: 'HH',
                        minute: 'MM',
                        second: 'SS'
                    }}
                />
            </h3>
        </Row>
    )
}

const Overlay =({endDate, news}) => 
{
    return(
        <Row>
            <Col xs={12} md={3} mdOffset={1}>
                <Timer endDate={endDate} />
            </Col>
            <Col xs={12} md={8}>
                <Ticker news={news} />
            </Col>
        </Row>
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
    endDate = '06/30/17'
    news = () =>{
        <span>
            Item1 Item2 Item3 Item4
        </span>
            
    }
    handleSave = (values) => {
        
        console.log(values)
        this.props.mutate({
            variables:{
                name:values.fullName,
                email: values.email,
                favouriteSport: values.favouriteSport
            }
        }).then(({data})=> {
            console.log(data)
            alert(`Thank you for signing up ${data.createMailingListItem.name}!\n We'll be in contact as soon as Athliche is done`)
        }).catch((error)=>{
            console.log(error)
        })
        this.props.dispatch(toggleDrawer())
    }
    handleInfo = () => {
        //this.props.dispatch(toggleDialog())
        this.props.dispatch(toggleDrawer())
    }
    handleOpen = () => {
        this.props.dispatch(toggleDrawer())
    }
    
    render(){
        return(
            <div>
                <Header handleOpen={this.handleOpen} isOpen={this.props.mailing.isOpen} />
                <Card>
                    <CardMedia 
                        overlay={<Overlay endDate={this.endDate} news={this.news} />}
                    >
                        <img src={bg} />
                    </CardMedia>
                </Card>
                <Intro isOpen={this.props.mailing.dialogOpen} handleClick={this.handleInfo} />
                <Drawer
                open={this.props.mailing.drawerOpen}
                title="Enter your email address"
                docked={false}
                >
                    <h2>Please fill out fields below</h2>
                    <br />
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

const createMailingListItem = gql`
    mutation createMailingListItem($name: String!, $email:String!, $favouriteSport:String!) {
        createMailingListItem(name:$name, email:$email, favouriteSport:$favouriteSport){
            name
            createdAt
        }
    }`


export default compose(
    graphql(createMailingListItem),
    connect(mapStateToProps)
    )(Landing)


//export default Landing