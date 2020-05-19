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
        <h1>TESTING!!!!</h1>
        <form onSubmit={e => this.props.handleNoteSubmit(e, this.state.note)}>
          <input
            type="textarea"
            placeholder="must wear with pearls!"
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
          save outfit
        </button>
      </div>
    )
  }
}
