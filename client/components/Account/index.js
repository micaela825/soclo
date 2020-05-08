import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../store'
import {getDresses} from '../../store/closet'
import './index.scss'

const BASE_CLASS = 'account'

class AccountContainer extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.getTotalItems = this.getTotalItems.bind(this)
    this.getTotalCost = this.getTotalCost.bind(this)
    this.getAvgCostPerWear = this.getAvgCostPerWear.bind(this)
  }

  componentDidMount() {
    store.dispatch(getDresses())
  }

  getTotalItems() {
    return this.props.dresses.length
  }

  getTotalCost() {
    let val = 0
    let dresses = this.props.dresses
    dresses.map(dress => {
      if (dress.cost) {
        val += dress.cost
      }
    })
    return val
  }

  getAvgCostPerWear() {
    let val = 0
    let dresses = this.props.dresses
    dresses.map(dress => {
      if (dress.wearCount && dress.cost) {
        val += dress.cost / dress.wearCount
      }
    })
    return val
  }

  render() {
    let totalItems = this.getTotalItems()
    let totalCost = this.getTotalCost()

    return (
      <div className={`${BASE_CLASS}`}>
        <div className={`${BASE_CLASS}__title`}>user account</div>
        <h2>total items in your closet:</h2>
        <h3>{totalItems}</h3>
        <h2>average cost of an item in your closet:</h2>
        <h3>{totalCost / totalItems}</h3>
        <div className={`${BASE_CLASS}__divider`} />
        <h2>total value of your wardrobe:</h2>
        <h3>${totalCost}</h3>
        <h2>average cost per wear of your wardrobe:</h2>
        <h3>${this.getAvgCostPerWear()}</h3>
        <div className={`${BASE_CLASS}__divider`} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    dresses: state.closet.dresses
  }
}

export default connect(mapState)(AccountContainer)
