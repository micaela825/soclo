import React, {Component} from 'react'
import {getOutfits} from '../../store/outfit'
import store from '../../store'
import {connect} from 'react-redux'
const BASE_CLASS = 'outfits'
import './index.scss'

class Outfit extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
  }
  componentDidMount() {
    store.dispatch(getOutfits())
    console.log('in component did mount', this.state)
  }
  render() {
    console.log('state in outfit component', this.state)
    // have tertiary to double check that there isn't a dress & top/bottom - ie, this.state.outfit.dressName? <return dress> / <return top and bottom>
    return (
      <div className={BASE_CLASS}>
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

// const mapState = state => {
//   return {
//     outfits: state.outfits
//   }
// }

export default connect(mapDispatchToProps)(Outfit)
