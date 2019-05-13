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
        blah blah!
        <form>
          <label>
            <small>item</small>

            <input
              name="dressName"
              type="text"
              onChange={this.handleDressName}
              value={this.state.dressName}
            />
          </label>
          <input type="submit" value="submit" color="red" />
        </form>
      </div>
    )
  }
}

export default AddDress
