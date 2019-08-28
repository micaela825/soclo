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
      submitted: true
    })
  }

  showWidget = widget => {
    widget.open()
  }

  checkUploadResult = resultEvent => {
    // if (resultEvent.event === 'success') {
    //   console.log(this.PaymentResponse.currentUser.id)
    //   this.PaymentResponse.postPhoto({
    //     user_id: this.props.currentUser.id,
    //     caption: '',
    //     url: resultEvent.info.secure_url
    //   }).then(this.props.history.push(`/profile`))
    // }
    //console.log('result event ****', resultEvent)
  }

  render() {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'micaelascloud',
        uploadPreset: 'ahb8abmz'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info)
        }
      }
    )
    console.log('this.state.submitted', this.state.submitted)
    return (
      <div id="add_container">
        {this.state.submitted ? (
          <Redirect to="/success" />
        ) : (
          <Body>
            add a dress
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

// ** TODO:
// add cloudinary functionality to local state
// add remove dress functionality
// add update dress
