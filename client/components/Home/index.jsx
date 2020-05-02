import React, {Component} from 'react'
// import {connect} from 'react-redux'
import './index.scss'
// import SimpleSlider from '../ItemCarousel/CarouselContainer'
const BASE_CLASS = 'home'

class Home extends Component {
  render() {
    return (
      <div className="hi">
        <h1>welcome.</h1>
      </div>
    )
  }
}

// const mapState = (state) => {
//   return {
//     // email: state.user.email
//   }
// }

// export default connect(mapState)(Home)
export default Home

/**
 * PROP TYPES
 */
// Home.propTypes = {
//   // email: PropTypes.string
// }
