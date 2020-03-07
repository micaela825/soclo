import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDresses, addWear} from '../../store/closet'
import store from '../../store'
import axios from 'axios'
import './index.scss'

const baseClass = 'closet-container'

class ClosetContainer extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    // this.removeDress = this.removeDress.bind(this)
    this.filterCostMoreThan50 = this.filterCostMoreThan50.bind(this)
    this.sortByCost = this.sortByCost.bind(this)
  }

  // async removeDress(dressId) {
  //   // before onClick, have confirmation pop-up - ask if want to remove dress. if no, route back to /closet, if yes, continue with delete dress
  //   await axios.delete(`api/closet/${dressId}`).then(
  //     this.setState({
  //       dresses: this.state.closet.dresses.filter(dress => dress.id !== dressId)
  //     })
  //   )
  // }

  async addWear(dressId) {
    store.dispatch(addWear(dressId))
    const dressToIncrement = await this.state.closet.dresses.filter(
      dress => dress.id === dressId
    )
    dressToIncrement[0].wearCount += 1
  }

  async sortByCost() {
    const sortedDresses = await this.state.closet.dresses.sort(function(a, b) {
      return a.cost - b.cost
    })
  }

  async filterCostMoreThan50() {
    const dressesFiltered = await this.state.closet.dresses.filter(
      dress => dress.cost > 50
    )
    // setDresses(dressesFiltered);
  }
  async componentDidMount() {
    store.dispatch(getDresses())
    this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div className={`${baseClass}`}>
        <div className={`${baseClass}_title`}>micaela's closet</div>

        <div className={`${baseClass}_nav`}>
          <div
            onClick={this.filterCostMoreThan50}
            className={`${baseClass}_menu-button`}
          >
            filter
          </div>

          <div onClick={this.sortByCost} className={`${baseClass}_menu-button`}>
            sort
          </div>

          <Link to="/add">
            <div className={`${baseClass}_menu-button`}>add an item </div>
          </Link>
        </div>
        <div className={`${baseClass}_table`}>
          {this.state.closet.dresses
            ? this.state.closet.dresses.map((dress, i) => (
                <div className={`${baseClass}_item`}>
                  <Link to={`/closet/${dress.id}`}>
                    <div>{dress.wearCount}</div>
                    <div className={`${baseClass}_image-body`}>
                      <img src={dress.imageURL} height="240" width="160" />
                    </div>
                    <div className={`${baseClass}_name-body`}>{dress.name}</div>
                  </Link>
                  <div className={`${baseClass}_buttons`}>
                    {/* <Link
                      className={`${baseClass}_remove-button`}
                      onClick={() => this.editArticle(dress.id)}
                      to="/edit"
                    >
                      edit
                    </Link> */}
                    <div
                      className={`${baseClass}_remove-button`}
                      onClick={() => this.addWear(dress.id)}
                    >
                      {' '}
                      + wear{' '}
                    </div>

                    {/* <div
                      className={`${baseClass}_remove-button`}
                      onClick={() => this.removeDress(dress.id)}
                    >
                      remove
                    </div> */}
                  </div>
                </div>
              ))
            : null}
        </div>
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
    getDresses: () => dispatch(getDresses()),
    addWear: dressId => dispatch(addWear(dressId))
  }
}

export default connect(mapState, mapDispatchToProps)(ClosetContainer)

// TODO:
// remove dress - confirm pop up, redirect to closet on confirmation
