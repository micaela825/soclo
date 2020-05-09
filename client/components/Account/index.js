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
    this.getPercentageOfWardrobeWorn = this.getPercentageOfWardrobeWorn.bind(
      this
    )
    this.getMostWornItem = this.getMostWornItem.bind(this)
    this.getMostWornBrand = this.getMostWornBrand.bind(this)
  }

  componentDidMount() {
    store.dispatch(getDresses())
  }

  getTotalItems() {
    return this.props.dresses.length
  }

  getTotalCost() {
    // todo - refactor to use reduce
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
    // todo - factor in zero wear-items? - remove wearCount from conditional and add totals separately
    let val = 0
    let count = 0
    let dresses = this.props.dresses
    dresses.map(dress => {
      if (dress.wearCount && dress.cost) {
        val += dress.cost / dress.wearCount
        count += 1
      }
    })
    return val / count
  }

  getPercentageOfWardrobeWorn() {
    let numOfItemsTotal = this.props.dresses.length
    let dresses = this.props.dresses
    let itemsWorn = dresses.filter(dress => dress.wearCount)
    return itemsWorn.length / numOfItemsTotal * 100
  }

  getMostWornItem() {
    const dresses = this.props.dresses.filter(dress => dress.wearCount)
    const reducer = (accumulator, currentValue) => {
      return accumulator.concat(currentValue.wearCount)
    }
    const sortedWearCounts = dresses
      .reduce(reducer, [], dresses)
      .sort((a, b) => a - b)
    const highestWearCount = sortedWearCounts[sortedWearCounts.length - 1]
    console.log('dresses', dresses, highestWearCount)
    const mostWornDress = dresses.filter(
      dress => dress.wearCount === highestWearCount
    )
    // console.log('most worn', mostWornDress)

    const mostWornDressName = mostWornDress[0] && mostWornDress[0].name

    return mostWornDressName
  }

  getMostWornBrand() {
    const dresses = this.props.dresses.filter(dress => dress.brand)
    const brandArray = array => {
      let reducer = (accumulator, currentValue) => {
        return accumulator.concat(currentValue.brand)
      }
      return array.reduce(reducer, [], array)
    }
    return brandArray(dresses).reduce(
      (a, b, i, arr) =>
        arr.filter(v => v === a).length >= arr.filter(v => v === b).length
          ? a
          : b,
      null
    )
  }

  render() {
    return (
      <div className={`${BASE_CLASS}`}>
        <div className={`${BASE_CLASS}__title`}>user account</div>
        <h2>total items in your closet:</h2>
        <h3>{this.getTotalItems()}</h3>
        <div className={`${BASE_CLASS}__divider`} />
        <h2>average cost of an item in your closet:</h2>
        <h3>{this.getTotalCost() / this.getTotalItems()}</h3>
        <div className={`${BASE_CLASS}__divider`} />
        <h2>total value of your wardrobe:</h2>
        <h3>${this.getTotalCost()}</h3>
        <h2>average cost per wear of your wardrobe:</h2>
        <h3>${this.getAvgCostPerWear()}</h3>
        <div className={`${BASE_CLASS}__divider`} />
        <h2>percentage of your wardrobe worn:</h2>
        <h3>{this.getPercentageOfWardrobeWorn()}%</h3>
        <div className={`${BASE_CLASS}__divider`} />
        <h2>the brand you've worn the most:</h2>
        <h3>{this.getMostWornBrand()}</h3>
        <div className={`${BASE_CLASS}__divider`} />
        <h2>article you've worn the most:</h2>
        <h3>{this.getMostWornItem()}</h3>
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
