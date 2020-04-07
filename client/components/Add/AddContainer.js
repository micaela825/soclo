import React, {Component} from 'react'
import './index.scss'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addDress} from '../../store/closet'
const BASE_CLASS = 'add-form'

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
      <div className={BASE_CLASS}>
        {this.state.submitted ? (
          <Redirect to="/success" />
        ) : (
          <div>
            <h1 className={`${BASE_CLASS}__header`}>add an article </h1>
            <form
              className={`${BASE_CLASS}__form`}
              onSubmit={this.handleSubmit}
            >
              <div className={`${BASE_CLASS}__form__title`}>item name</div>
              <input
                className={`${BASE_CLASS}__form__input`}
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />

              <div className={`${BASE_CLASS}__form__title`}>description</div>
              <input
                className={`${BASE_CLASS}__form__input`}
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.description}
              />

              <div className={`${BASE_CLASS}__form__title`}>wears</div>
              <input
                className={`${BASE_CLASS}__form__input`}
                name="wearCount"
                type="text"
                onChange={this.handleChange}
                value={this.state.wearCount}
              />

              <div className={`${BASE_CLASS}__form__title`}>cost</div>
              <input
                className={`${BASE_CLASS}__form__input`}
                name="cost"
                type="text"
                onChange={this.handleChange}
                value={this.state.cost}
              />

              {/* <label>
                <div>cost per wear goal: </div>
                {// add tooltip above}
                <input
                  name="cost"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.cost}
                />
              </label> */}
              <button className={`${BASE_CLASS}__form__submit`} type="submit">
                Submit
              </button>
            </form>
            <div onClick={() => this.showWidget(widget)}>Upload image</div>
          </div>
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
