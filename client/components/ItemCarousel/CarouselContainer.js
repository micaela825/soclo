import React, {Component} from 'react'
import Slider from 'react-slick'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '60px',
      slidesToShow: 3,
      speed: 500
    }
    console.log('settings ***', settings)
    return (
      <div className="carousel">
        <h2>Center Mode</h2>
        <Slider {...settings}>
          <div>
            <h3>1 apple</h3>
          </div>
          <div>
            <h3>2banana </h3>
          </div>
          <div>
            <h3>3 cherries</h3>
          </div>
          <div>
            <h3>4 peaches</h3>
          </div>
          <div>
            <h3>5 berries</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    )
  }
}
