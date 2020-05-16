import React, {Component} from 'react'
import {getOutfits} from '../../store/outfit'
import {getDresses} from '../../store/closet'
import store from '../../store'
import {connect} from 'react-redux'
import RandomOutfit from './components/RandomOutfit'
import getRandomOutfit from './utils/getRandomOutfit'
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
      randomDress: {},
      isShuffleOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.newOutfit = {}
  }
  componentDidMount() {
    store.dispatch(getOutfits())
    store.dispatch(getDresses())
    // TODO: figure out what's going on here - why below line makes outfits appear on 1st render when they otherwise don't
    this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }

  getRandomInteger(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  handleBtnClick() {
    this.setState({
      isShuffleOpen: false
    })
  }

  handleClick() {
    const {randomDress, randomShoes, randomTop, randomBottom} = getRandomOutfit(
      this.state.closet
    )
    this.setState({
      randomTop: randomTop,
      randomBottom: randomBottom,
      randomShoes: randomShoes,
      randomDress: randomDress,
      isShuffleOpen: true
    })
  }

  render() {
    return (
      <div className={BASE_CLASS}>
        <button type="submit" onClick={this.handleClick}>
          surprise me! grab a few hangers
        </button>
        {this.state.isShuffleOpen ? (
          <div>
            <RandomOutfit
              top={this.state.randomTop && this.state.randomTop.imageURL}
              bottom={
                this.state.randomBottom && this.state.randomBottom.imageURL
              }
              shoes={this.state.randomShoes && this.state.randomShoes.imageURL}
              dress={this.state.randomDress && this.state.randomDress.imageURL}
              handleClick={this.handleClick}
              handleBtnClick={this.handleBtnClick}
            />
          </div>
        ) : null}
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
