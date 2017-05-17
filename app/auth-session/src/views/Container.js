import React, { PropTypes as T } from 'react'
import { Jumbotron } from 'react-bootstrap'

export class Container extends React.Component {
  
  constructor()
  {
     super(props)
  }

  static contextTypes = {
    router: T.object
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <Jumbotron>
        <h2 >
          Login App
        </h2>
        {children}
      </Jumbotron>
    )
  }
}

export default Container;
