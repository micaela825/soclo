import React, {Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
// import SimpleSlider from '../ItemCarousel/CarouselContainer'
const BASE_CLASS = 'home'

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
    event.preventDefault()
    this.setState({keyword: '', zipcode: ''})
  }

  handleAdvancedClick(event) {
    // console.log('advanced search', event.target)
  }
  render() {
    return (
      <div className={BASE_CLASS}>
        <h1>welcome.</h1>
        {/* <h2>Find something beautiful</h2>
        <div onSubmit={this.handleSearchClick}>
          <div>
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
          </div>
          <div>
            <label>
              <small>Zip code</small>
            </label>
            <input
              name="zipcode"
              type="text"
              value={this.state.zipcode}
              onChange={this.handleZipChange}
            />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </div> */}
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
