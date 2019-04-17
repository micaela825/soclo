import React, {Component} from 'react'

class AddDress extends Component {
  constructor() {
    super()
    this.state = {
      dressName: ''
    }
    this.handleDressName = this.handleDressName.bind(this)
  }
  handleDressName(e) {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
    console.log(this.state.dressName, '******DRESS NAME')
  }

  // handleSubmit(e){
  //   e.preventDefault();
  //   this.setState({

  //   })
  // }

  render() {
    return (
      <div>
        adding a dress here!
        <label>
          <small>Item name</small>

          <input
            name="dressName"
            type="text"
            onChange={this.handleDressName}
            value={this.state.dressName}
          />
        </label>
      </div>
    )
  }
}

export default AddDress
