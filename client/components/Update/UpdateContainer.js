import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateDress} from '../../store/closet'
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
  }

  render() {
    const dressToEdit = this.props.location.state

    return (
      <div id="add_container">
        <div>
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
                name="wearCount"
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
        </div>
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
