import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'

class UserHome extends Component {
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
      <div id="user-container">
        <Row>
          <Col xs={12}>
            <h2>Find something beautiful</h2>
          </Col>
        </Row>
        <form onSubmit={this.handleSearchClick}>
          <Row>
            <Col xs={12}>
              <label>
                <small>blahhh</small>

                <input
                  name="keyword"
                  type="text"
                  onChange={this.handleTermChange}
                  value={this.state.keyword}
                />
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <label>
                <small>Zip code</small>
              </label>
              <input
                name="zipcode"
                type="text"
                value={this.state.zipcode}
                onChange={this.handleZipChange}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <input type="submit" value="Submit" />
            </Col>
          </Row>
        </form>
        <Row>
          {/* <Col xs={12}>
              <button type="text" onClick={this.handleAdvancedClick}>
                Advanced Search
              </button>
            </Col> */}
        </Row>
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  // email: PropTypes.string
}
