import React, {Component} from 'react'
import {getOutfits} from '../../store/outfit'
import {getDresses} from '../../store/closet'
import store from '../../store'
import {connect} from 'react-redux'
const BASE_CLASS = 'outfits'
import './index.scss'

class Outfit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...store.getState(),
      randomTop: {},
      randomBottom: {},
      randomShoes: {},
      isShuffleOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.newOutfit = {}
  }
  componentDidMount() {
    store.dispatch(getOutfits())
    store.dispatch(getDresses())
  }

  getRandomInteger(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  handleClick() {
    // figuere out way to proportionately designate dress vs other in randomization - ie if user has 10% dreses make sure dresses aren't returned 50% of the time
    // 1) if either no pants or no tops, no outfits
    // maybe use reducer ???? get ratio of dresses to pants -
    const tops = this.state.closet.dresses.filter(
      item => item.category === 'top'
    )
    const bottoms = this.state.closet.dresses.filter(
      item => item.category === 'bottom'
    )
    const shoes = this.state.closet.dresses.filter(
      item => item.category === 'shoes'
    )
    const randomTopMaxVal = this.getRandomInteger(tops.length)
    const randomBottomMaxVal = this.getRandomInteger(bottoms.length)
    const randomShoesMaxVal = this.getRandomInteger(shoes.length)
    const randomTop = tops[randomTopMaxVal]
    const randomBottom = bottoms[randomBottomMaxVal]
    const randomShoes = shoes[randomShoesMaxVal]
    this.setState({
      randomTop: randomTop,
      randomBottom: randomBottom,
      randomShoes: randomShoes
    })
  }

  render() {
    // design for random toggle - have modal? have 'x' button close it out
    // have tertiary to double check that there isn't a dress & top/bottom - ie, this.state.outfit.dressName? <return dress> / <return top and bottom>
    return (
      <div className={BASE_CLASS}>
        <button type="submit" onClick={this.handleClick}>
          surprise me! grab a few hangers
        </button>
        <div>
          {this.state.randomTop &&
          this.state.randomBottom &&
          this.state.randomShoes ? (
            <div>
              <img src={this.state.randomTop.imageURL} />
              <img src={this.state.randomBottom.imageURL} />
              <img src={this.state.randomShoes.imageURL} />
            </div>
          ) : null}
        </div>
        <div className={`${BASE_CLASS}__title`}>your outfits</div>
        {this.state.outfit
          ? this.state.outfit.outfits.map((outfit, key) => (
              <div key={key} className={`${BASE_CLASS}__outfit`}>
                <img
                  alt={outfit.dressName}
                  src={outfit.dressImageURL}
                  className={`${BASE_CLASS}__outfit__dress`}
                />
                <img
                  alt={outfit.topName}
                  src={outfit.topImageURL}
                  className={`${BASE_CLASS}__outfit__top`}
                />
                <img
                  alt={outfit.bottomName}
                  src={outfit.bottomImageURL}
                  className={`${BASE_CLASS}__outfit__bottom`}
                />
                <img
                  alt={outfit.outerwearName}
                  src={outfit.outerwearImageURL}
                  className={`${BASE_CLASS}__outfit__outerwear`}
                />
                <img
                  alt={outfit.shoesName}
                  src={outfit.shoesImageURL}
                  className={`${BASE_CLASS}__outfit__shoes`}
                />
                <div className={`${BASE_CLASS}__outfit__divider`} />
              </div>
            ))
          : null}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOutfits: () => dispatch(getOutfits())
  }
}

export default connect(mapDispatchToProps)(Outfit)
