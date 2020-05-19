import React, {Component} from 'react'
import './index.scss'

const BASE_CLASS = 'add-note-form'

export default class AddNoteForm extends Component {
  constructor(props) {
    super()
    this.state = {
      note: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      note: event.target.value
    })
  }

  render() {
    return (
      <div className={BASE_CLASS}>
        <h2 className={`${BASE_CLASS}__title`}>
          do you want to add a note to this outfit?
        </h2>
        <form
          onSubmit={e => this.props.handleNoteSubmit(e, this.state.note)}
          className={`${BASE_CLASS}__form`}
        >
          <input
            type="textarea"
            placeholder="e.g.must wear with pearls!"
            className={`${BASE_CLASS}__input`}
            name="note"
            value={this.state.note}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            text="submit"
            className={`${BASE_CLASS}__submitBtn`}
          >
            add note and save outfit
          </button>
        </form>
        <button
          type="button"
          text="save"
          className={`${BASE_CLASS}__saveBtn`}
          onClick={this.props.createOutfit}
        >
          continue to save outfit
        </button>
      </div>
    )
  }
}
