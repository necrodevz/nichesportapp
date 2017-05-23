import React from 'react'
import logo from './logo.png'
import bg from './bg.png'
import {Card, CardMedia} from 'material-ui/Card'
//import {Grid, Row, Col} from 'react-flexbox-grid'
import Dialog from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import {connect} from 'react-redux'
import {openModal} from '../actions'

const handleSave=(e)=>{
    console.log(e.target.value)
}

const Overlay = () =>
{
    return(<div />)
    
}

const Header = ({dispatch}) =>
{
    return(
        <AppBar
            title='Athliche App Coming Soon'
            iconElementLeft={<img src={logo} height='50px' />}
            iconElementRight={<FlatButton  label='Get Notified!' />}
        />
    )
    
}

const Landing = ({isOpen, dispatch}) => 
{
    return(
        <div>
            <Header dispatch={dispatch} />
            <Card>
                <CardMedia overlay={<Overlay />} >
                    <img src={bg} />
                </CardMedia>
            </Card>
            <Dialog
            actions={<FlatButton label='Submit' onTouchTap={handleSave} />}
            open={isOpen}
            modal={true}
            title="Enter your email address"
            >
            
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) =>
{
  return {
    mailing: state.mailing
  }
}


export default connect(mapStateToProps)(Landing)


//export default Landing