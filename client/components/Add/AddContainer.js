import React, {Component} from 'react'
import AddSuccess from '../AddSuccess/AddSuccess'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addDress} from '../../store/closet'
import {Widget, Body} from './Add.style'

class AddContainer extends Component {
  constructor(props) {
    super(props)
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
    this.props.addDress(this.state)

    this.setState({
      imageURL: '',
      name: '',
      description: '',
      wearCount: '',
      cost: '',
      submitted: true
    })
  }

  showWidget = widget => {
    widget.open()
  }

  checkUploadResult = resultEvent => {
    if (resultEvent.event === 'success') {
      console.log(this.PaymentResponse.currentUser.id)
      this.PaymentResponse.postPhoto({
        user_id: this.props.currentUser.id,
        caption: '',
        url: resultEvent.info.secure_url
      }).then(this.props.history.push(`/profile`))
    }
  }

  render() {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'micaelascloud',
        uploadPreset: 'ahb8abmz',
        showAdvancedOptions: true
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info)
          this.setState({
            imageURL: result.info.url
          })
        }
      }
    )
    return (
      <div id="add_container">
        {this.state.submitted ? (
          <Redirect to="/success" />
        ) : (
          <Body>
            add a dress
            <form onSubmit={this.handleSubmit}>
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
              <label>
                <small>wears</small>
                <input
                  name="wearCount"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.wearCount}
                />
              </label>
              <label>
                <small>purchase cost</small>
                <input
                  name="cost"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.cost}
                />
              </label>
              {/* <label>
                <small>cost per wear goal: </small>
                {// add tooltip above}
                <input
                  name="cost"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.cost}
                />
              </label> */}
              <button type="submit">Submit</button>
            </form>
            <Widget onClick={() => this.showWidget(widget)}>
              Upload image
            </Widget>
          </Body>
        )}
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
    addDress: dress => dispatch(addDress(dress))
  }
}

export default connect(mapState, mapDispatch)(AddContainer)
