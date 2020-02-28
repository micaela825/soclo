import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateDress} from '../../store/closet'
import {Body} from '../Add/Add.style'

class UpdateContainer extends Component {
  constructor(dress) {
    super(dress)

    this.state = {
      imageURL: '',
      name: '',
      description: '',
      wearCount: '',
      cost: '',
      submitted: false
    }
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
        <Body>
          edit
          <form onSubmit={this.handleSubmit}>
            <label>
              <small>url image</small>
              <input
                name="imageURL"
                type="text"
                value={this.state.imageURL}
                onChange={this.handleChange}
              />
            </label>

            <label>
              <small>dress name</small>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder={dressToEdit.name}
              />
            </label>

            <label>
              <small>description</small>
              <input
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.description}
                placeholder={dressToEdit.description}
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
