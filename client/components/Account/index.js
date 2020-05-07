import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../store'
import {getDresses} from '../../store/closet'
import './index.scss'

const BASE_CLASS = 'account'

class AccountContainer extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  async componentDidMount() {
    await store
      .dispatch(getDresses())
      .then(this.getTotalItems())
      .then((this.total = this.getTotalIds()))
    // this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }
  getTotalItems() {
    return this.state.closet.dresses.length
  }

  getTotalIds() {
    let val = 0
    let dresses = this.state.closet.dresses
    dresses.map(dress => {
      if (dress.id) {
        val += dress.id
      }
    })
    return val
  }

  render() {
    return (
      <div className={`${BASE_CLASS}`}>
        <div className={`${BASE_CLASS}__title`}>user account</div>
        <h2>total items in your closet:</h2>
        <h3>{this.state.closet.dresses.length}</h3>
        <h2>total value of your wardrobe:</h2>
        <h3>{this.total}</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    dresses: state.closet.dresses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDresses: () => dispatch(getDresses())
  }
}

export default connect(mapState, mapDispatchToProps)(AccountContainer)
