import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDresses} from '../store/closet'
import AddDress from './AddDress'

class UserCloset extends Component {
  // constructor(props) {
  //   super(props)
  // }

  componentDidMount() {
    this.props.getDresses()
  }

  render() {
    console.log('this props users in render****', this.props.dresses)

    return (
      <div id="user-container">
        <AddDress />
        <h1>user closet</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dresses
              ? this.props.dresses.map(dress => (
                  <tr key={dress.id}>
                    <td>{dress.name}</td>

                    <td>
                      <img src={dress.imageURL} height="200" width="150" />
                    </td>

                    <td>{dress.description}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    dresses: state.closet.dresses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDresses: () => dispatch(getDresses())
  }
}

export default connect(mapState, mapDispatchToProps)(UserCloset)
