import React, {Component} from 'react'
import {getOutfits} from '../../store/outfit'
import {getDresses} from '../../store/closet'
import store from '../../store'
import axios from 'axios'
import {connect} from 'react-redux'
import RandomOutfit from './components/RandomOutfit'
import getRandomOutfit from './utils/getRandomOutfit'
import {setIsModalOpen} from '../../store/utils'
import RemoveConfirmation from './components/RemoveConfirmation'
import classnames from 'classnames'

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
      isShuffleOpen: false,
      isHoverMenuOpen: false,
      hoverIndex: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.newOutfit = {}
    this.removeOutfit = this.removeOutfit.bind(this)
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

  handleHover(outfit, i) {
    this.setState({
      isHoverMenuOpen: true,
      hoverIndex: i
    })
  }

  removeOutfit(i, outfitId) {
    store.dispatch(setIsModalOpen(true))
  }

  async handleAccept(outfitId) {
    store.dispatch(setIsModalOpen(false))
    await axios.delete(`/api/outfits/`, {data: {outfitId}})
  }

  handleCancel() {
    store.dispatch(setIsModalOpen(false))
  }

  render() {
    return (
      <div className={BASE_CLASS}>
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
        <div className={`${BASE_CLASS}__menu`}>
          <button
            type="submit"
            // onClick={this.handleClick}
            className={`${BASE_CLASS}__menu__button`}
          >
            tops & bottoms
          </button>
          <button
            type="submit"
            // onClick={this.handleClick}
            className={`${BASE_CLASS}__menu__button`}
          >
            dresses only
          </button>
          <button
            type="submit"
            onClick={this.handleClick}
            className={classnames(
              `${BASE_CLASS}__menu__button`,
              `${BASE_CLASS}__menu__button__shuffle`
            )}
          >
            shuffle my closet
          </button>
        </div>
        <div className={`${BASE_CLASS}__grid`}>
          {this.state.outfit
            ? this.state.outfit.outfits.map((outfit, i) => (
                <div
                  key={i}
                  className={classnames(`${BASE_CLASS}__grid__outfit`, {})}
                  onMouseOver={() => this.handleHover(outfit, i)}
                >
                  {this.state.isHoverMenuOpen && this.state.hoverIndex === i ? (
                    <div>
                      {this.state.utils.isModalOpen ? (
                        <RemoveConfirmation
                          handleCancel={this.handleCancel}
                          handleAccept={this.handleAccept}
                          outfitId={outfit.id}
                        />
                      ) : null}
                      <div>{this.state.outfit.outfits[i].notes}</div>
                      <button
                        type="button"
                        onClick={() => this.removeOutfit(i, outfit.id)}
                      >
                        remove outfit / icon
                      </button>
                    </div>
                  ) : null}
                  <img
                    alt={outfit.dressName}
                    src={outfit.dressImageURL}
                    className={`${BASE_CLASS}__grid__outfit__dress`}
                  />
                  <img
                    alt={outfit.topName}
                    src={outfit.topImageURL}
                    className={`${BASE_CLASS}__grid__outfit__top`}
                  />
                  <img
                    alt={outfit.bottomName}
                    src={outfit.bottomImageURL}
                    className={`${BASE_CLASS}__grid__outfit__bottom`}
                  />
                  <img
                    alt={outfit.outerwearName}
                    src={outfit.outerwearImageURL}
                    className={`${BASE_CLASS}__grid__outfit__outerwear`}
                  />
                  <img
                    alt={outfit.shoesName}
                    src={outfit.shoesImageURL}
                    className={`${BASE_CLASS}__grid__outfit__shoes`}
                  />
                </div>
              ))
            : null}
        </div>
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
