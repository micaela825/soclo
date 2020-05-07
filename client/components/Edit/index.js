import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updateDress} from '../../store/closet'
import store from '../../store'
const BASE_CLASS = 'edit'
import './index.scss'

class Update extends Component {
  constructor(dress) {
    super(dress)
    this.state = {...store.getState(), error: ''}
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
    if (this.state.cost && isNaN(this.state.cost)) {
      this.setState({
        error: 'the item cost must be a number'
      })
    } else if (this.state.wearCount && isNaN(this.state.wearCount)) {
      this.setState({
        error: 'the item wear count must be a number'
      })
    } else {
      this.props
        .updateDress(this.state, dressId)
        .then(() => this.props.history.push('/closet'))
    }
  }

  render() {
    const dressToEdit = this.props.location.state

    return (
      <div className={BASE_CLASS}>
        <h1 className={`${BASE_CLASS}__header`}>edit</h1>
        {this.state.error && (
          <h3 className={`${BASE_CLASS}__error`}>{this.state.error}</h3>
        )}
        <form className={`${BASE_CLASS}__form`} onSubmit={this.handleSubmit}>
          <div className={`${BASE_CLASS}__form__title`}>item name</div>
          <input
            className={`${BASE_CLASS}__form__input`}
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            // placeholder={dressToEdit.name}
          />
          <div className={`${BASE_CLASS}__form__title`}>wears</div>
          <input
            className={`${BASE_CLASS}__form__input`}
            name="wearCount"
            type="text"
            onChange={this.handleChange}
            value={this.state.wearCount}
            // placeholder={dressToEdit.wearCount}
          />
          <div className={`${BASE_CLASS}__form__title`}>cost</div>
          <input
            className={`${BASE_CLASS}__form__input`}
            name="cost"
            type="text"
            onChange={this.handleChange}
            value={this.state.cost}
            // placeholder={dressToEdit.cost}
          />
          <button className={`${BASE_CLASS}__form__submit`} type="submit">
            Submit
          </button>
        </form>
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

export default connect(mapState, mapDispatch)(Update)

// ** TODO:
// add cloudinary functionality to local state
