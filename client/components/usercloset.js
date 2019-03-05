import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/user'

class UserCloset extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    console.log('this props users in render****', this.props.users)

    return (
      <div id="user-container">
        <h1>user closet</h1>

        {this.props.users
          ? this.props.users.map(user => <h3>{user.email}</h3>)
          : null}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  }
}

export default connect(mapState, mapDispatchToProps)(UserCloset)
