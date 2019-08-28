import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Table, Header, Input, SubmitBtn} from './UserHome.style'

class UserHomeContainer extends Component {
  constructor() {
    super()
    this.state = {
      keyword: '',
      zipcode: ''
    }
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleZipChange = this.handleZipChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.handleAdvancedClick = this.handleAdvancedClick.bind(this)
  }

  handleTermChange(event) {
    const name = event.target.name
    this.setState({[name]: event.target.value})
  }

  handleZipChange(event) {
    const name = event.target.name
    this.setState({[name]: event.target.value})
  }

  handleSearchClick(event) {
    console.log(this.state.keyword, this.state.zipcode)
    event.preventDefault()
    this.setState({keyword: '', zipcode: ''})
  }

  handleAdvancedClick(event) {
    console.log('advanced search', event.target)
  }
  render() {
    return (
      <div>
        <Header>Find something beautiful</Header>
        <Table onSubmit={this.handleSearchClick}>
          <Input>
            <label>
              <small>keyword</small>
              <input
                name="keyword"
                placeholder="little black dress"
                type="text"
                onChange={this.handleTermChange}
                value={this.state.keyword}
              />
            </label>
          </Input>
          <Input>
            <label>
              <small>Zip code</small>
            </label>
            <input
              name="zipcode"
              type="text"
              value={this.state.zipcode}
              onChange={this.handleZipChange}
            />
          </Input>
          <Input>
            <input type="submit" value="Submit" />
          </Input>
          {/* </form> */}
          {/* <Col xs={12}>
              <button type="text" onClick={this.handleAdvancedClick}>
                Advanced Search
              </button>
            </Col> */}
        </Table>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // email: state.user.email
  }
}

export default connect(mapState)(UserHomeContainer)

/**
 * PROP TYPES
 */
UserHomeContainer.propTypes = {
  // email: PropTypes.string
}
