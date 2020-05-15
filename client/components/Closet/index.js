import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDresses, addWear} from '../../store/closet'
import {addOutfit} from '../../store/outfit'
import {setIsModalOpen} from '../../store/utils'
import RemoveConfirmationModal from '../RemoveConfirmation'
import store from '../../store'
import axios from 'axios'
import EditIcon from '../../../public/editIcon'
import AddIcon from '../../../public/addIcon'
import './index.scss'

const BASE_CLASS = 'closet'

class ClosetContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...store.getState(),
      singleOutfit: [],
      isSubmitted: false,
      showSuccessIcon: false
    }
    this.filterCostMoreThan50 = this.filterCostMoreThan50.bind(this)
    this.sortByCost = this.sortByCost.bind(this)
    this.saveOutfit = this.saveOutfit.bind(this)
    this.createOutfit = this.createOutfit.bind(this)
  }

  async addWear(dressId) {
    store.dispatch(addWear(dressId))
    const dressToIncrement = await this.state.closet.dresses.filter(
      dress => dress.id === dressId
    )
    dressToIncrement[0].wearCount += 1
  }

  async handleAccept(dressId) {
    store.dispatch(setIsModalOpen(false))
    await axios.delete(`/api/closet/${dressId}`)
  }
  showModal(dressId) {
    store.dispatch(setIsModalOpen(true))
  }

  handleCancel() {
    store.dispatch(setIsModalOpen(false))
  }

  async sortByCost() {
    await this.state.closet.dresses.sort(function(a, b) {
      return a.cost - b.cost
    })
  }

  async filterCostMoreThan50() {
    await this.state.closet.dresses.filter(dress => dress.cost > 50)
  }

  createOutfit(dress) {
    this.state.singleOutfit.push(dress)
  }

  saveOutfit() {
    this.setState({isSubmitted: false})
    store.dispatch(addOutfit(this.state.singleOutfit))
    this.setState({isSubmitted: true})
    setTimeout(
      () => this.setState({isSubmitted: false, showSuccessIcon: true}),
      2000
    )
    setTimeout(() => this.setState({showSuccessIcon: false}), 3000)
  }

  componentDidMount() {
    store.dispatch(getDresses())
    this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    console.log('is submitted', this.state.isSubmitted)
    return (
      <div className={`${BASE_CLASS}`}>
        <div className={`${BASE_CLASS}__title`}>your wardrobe</div>
        <div className={`${BASE_CLASS}__menu`}>
          <div
            onClick={this.filterCostMoreThan50}
            className={`${BASE_CLASS}__menu__button`}
          >
            {' '}
            filter{' '}
          </div>
          <div
            onClick={this.saveOutfit}
            className={`${BASE_CLASS}__menu__button`}
          >
            save outfit
            {this.state.isSubmitted ? <div>***</div> : null}
            {this.state.showSuccessIcon ? <div>!!!!!</div> : null}
          </div>

          <div
            onClick={this.sortByCost}
            className={`${BASE_CLASS}__menu__button`}
          >
            sort
          </div>
          <Link to="/add">
            <div className={`${BASE_CLASS}__menu__button`}>add</div>
          </Link>
        </div>
        <div className={`${BASE_CLASS}__table`}>
          {this.state.closet.dresses
            ? this.state.closet.dresses.map((dress, i) => (
                <div className={`${BASE_CLASS}__item`} key={i}>
                  <Link
                    to={`/closet/${dress.id}`}
                    className={`${BASE_CLASS}__item__body`}
                  >
                    <div className={`${BASE_CLASS}__item__body__wearcount`}>
                      {dress.wearCount}
                    </div>
                    <img
                      className={`${BASE_CLASS}__item__body__image`}
                      src={dress.imageURL}
                    />
                    <div className={`${BASE_CLASS}__item__body__name`}>
                      {dress.name}
                    </div>
                  </Link>
                  <div className={`${BASE_CLASS}__buttons`}>
                    <Link
                      className={`${BASE_CLASS}__buttons__edit`}
                      to={{pathname: `/closet/${dress.id}/edit`, state: dress}}
                    >
                      edit
                    </Link>
                    {/* <EditIcon className={`${BASE_CLASS}__buttons__edit`} />
                    <AddIcon className={`${BASE_CLASS}__buttons__add`} /> */}
                    <div
                      className={`${BASE_CLASS}__buttons__add`}
                      onClick={() => this.addWear(dress.id)}
                    >
                      {' '}
                      +wear{' '}
                    </div>
                    <div
                      className={`${BASE_CLASS}__buttons__add`}
                      onClick={() => this.createOutfit(dress)}
                    >
                      add to outfit
                    </div>
                    <div className={`${BASE_CLASS}__divider`} />
                    {/* <div
                      className={`${BASE_CLASS}__info__buttons__remove`}
                      onClick={() => this.showModal(dress.id)}
                    >
                      remove
                    </div> */}
                  </div>
                  {this.state.utils.isModalOpen ? (
                    <RemoveConfirmationModal
                      handleCancel={this.handleCancel}
                      handleAccept={this.handleAccept}
                      dressId={dress.id}
                    />
                  ) : null}
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
    addWear: dressId => dispatch(addWear(dressId)),
    addOutfit: articles => dispatch(addOutfit(articles))
  }
}

export default connect(mapState, mapDispatchToProps)(ClosetContainer)
