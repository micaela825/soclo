import React, {Component} from 'react'
import {connect} from 'react-redux'
import './index.scss'
// import SimpleSlider from '../ItemCarousel/CarouselContainer'
const BASE_CLASS = 'home'

const Home = props => {
  return (
    <div className={BASE_CLASS}>
      {props.name ? <h2>welcome, {props.name}!</h2> : <h2>welcome!</h2>}
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.user.email,
    name: state.user.user.name
  }
}

export default connect(mapState)(Home)

/**
 * PROP TYPES
 */
// Home.propTypes = {
//   // email: PropTypes.string
// }
