import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateDress} from '../../store/closet'
import {Body} from '../Add/Add.style'
import store from '../../store'

class UpdateContainer extends Component {
  constructor(dress) {
    super(dress)
    this.state = store.getState()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const dressId = this.props.match.params.dressId
    this.props.updateDress(this.state, dressId)
    console.log('new state after handle submit', this.state)
  }

  render() {
    const dressToEdit = this.props.location.state
    console.log('here in update container')

    return (
      <div id="add_container">
        <Body>
          edit
          <form onSubmit={this.handleSubmit}>
            <label>
              <small>dress name</small>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                // placeholder={dressToEdit.name}
              />
            </label>

            <label>
              <small>wear count</small>
              <input
                name="wear count"
                type="text"
                onChange={this.handleChange}
                value={this.state.wearCount}
                // placeholder={dressToEdit.wearCount}
              />
            </label>
            <label>
              <small>cost</small>
              <input
                name="cost"
                type="text"
                onChange={this.handleChange}
                value={this.state.cost}
                // placeholder={dressToEdit.cost}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </Body>
      </div>
    )
  }
}

const mapState = state => {
  return {
    dress: state.dress
  }
}

const mapDispatch = dispatch => {
  return {
    updateDress: (dress, id) => dispatch(updateDress(dress, id))
  }
}

export default connect(mapState, mapDispatch)(UpdateContainer)

// ** TODO:
// add cloudinary functionality to local state
// add remove dress functionality
