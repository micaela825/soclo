import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateDress} from '../../store/closet'
import {Body} from '../Add/Add.style'

// EDIT DRESS SHOULD RETURN DRESS FROM DB

class UpdateContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageURL: '',
      name: '',
      description: '',
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
    this.props.editDress(this.state)

    this.setState({
      imageURL: '',
      name: '',
      description: '',
      submitted: true
    })
  }

  render() {
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
              />
            </label>

            <label>
              <small>description</small>
              <input
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.description}
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
    updateDress: dress => dispatch(updateDress(dress))
  }
}

export default connect(mapState, mapDispatch)(UpdateContainer)

// ** TODO:
// add cloudinary functionality to local state
// add remove dress functionality
// add update dress
