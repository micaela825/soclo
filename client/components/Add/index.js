import React, {Component, Fragment} from 'react'
import './index.scss'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {addDress} from '../../store/closet'
const BASE_CLASS = 'add-form'
import classnames from 'classnames'
import brands from './utils/brands'
import categories from './utils/categories'

class AddContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageURL: '',
      name: '',
      description: '',
      wearCount: '',
      cost: '',
      submitted: false,
      category: '',
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      error: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.name && !this.state.imageURL) {
      this.setState({
        error: 'please enter an item name or image'
      })
    } else if (this.state.cost && isNaN(this.state.cost)) {
      this.setState({
        error: 'the item cost must be a number'
      })
    } else if (this.state.wearCount && isNaN(this.state.wearCount)) {
      this.setState({
        error: 'the item wear count must be a number'
      })
    } else {
      this.props.addDress(this.state)

      this.setState({
        imageURL: '',
        name: '',
        description: '',
        wearCount: '',
        cost: '',
        submitted: true,
        // category: '',
        error: ''
      })
    }
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
    // let imageArr = []

    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'micaelascloud',
        uploadPreset: 'ahb8abmz',
        showAdvancedOptions: true
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          // console.log('Done! Here is the image info: ', result.info)
          //imageArr.push(result.info.url)

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
          <Fragment>
            <h1 className={`${BASE_CLASS}__header`}>add an item </h1>
            {this.state.error && (
              <h3 className={`${BASE_CLASS}__error`}>{this.state.error}</h3>
            )}
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
              <div className={`${BASE_CLASS}__form__title`}>category</div>
              {categories.map((item, key) => (
                <button
                  key={key}
                  value={item}
                  name="category"
                  type="button"
                  className={`${BASE_CLASS}__form__category`}
                  onClick={this.handleChange}
                >
                  {item}
                </button>
              ))}
              <div className={`${BASE_CLASS}__form__title`}>$ cost</div>
              <input
                className={`${BASE_CLASS}__form__input`}
                name="cost"
                type="text"
                onChange={this.handleChange}
                value={this.state.cost}
              />

              <div className={`${BASE_CLASS}__form__title`}># of wears</div>
              <input
                className={`${BASE_CLASS}__form__input`}
                name="wearCount"
                type="text"
                onChange={this.handleChange}
                value={this.state.wearCount}
              />
              <div className={`${BASE_CLASS}__form__title`}>brand</div>
              <input
                type="text"
                list="datalist"
                className={`${BASE_CLASS}__form__input`}
              />
              <datalist id="datalist">
                {brands.map((item, key) => <option key={key} value={item} />)}
              </datalist>

              <div
                className={`${BASE_CLASS}__form__upload`}
                onClick={() => this.showWidget(widget)}
              >
                Upload image
              </div>
              <button className={`${BASE_CLASS}__form__submit`} type="submit">
                add item
              </button>
            </form>
          </Fragment>
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
