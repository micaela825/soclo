import React, {Component, useState} from 'react'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
import store from '../../store'
import {setIsModalOpen} from '../../store/utils'
import {getSingleDress, addWear} from '../../store/closet'
import './index.scss'
import RemoveConfirmationModal from '../RemoveConfirmation'
import {connect} from 'react-redux'

const BASE_CLASS = 'article'

class ArticleContainer extends Component {
  constructor(props) {
    super()
    this.state = store.getState()
    this.showModal = this.showModal.bind(this)
  }

  componentDidMount() {
    const dressId = this.props.match.params.dressId
    store.dispatch(getSingleDress(dressId))
    this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }

  showModal(dressId) {
    store.dispatch(setIsModalOpen(true))
  }

  async addWear(dressId) {
    store.dispatch(addWear(dressId))
    const dressToAddWear = await this.state.closet.dress[0]
    dressToAddWear.wearCount += 1
  }

  async handleAccept(dressId) {
    store.dispatch(setIsModalOpen(false))
    await axios.delete(`/api/closet/${dressId}`)
  }

  handleCancel() {
    store.dispatch(setIsModalOpen(false))
  }

  render() {
    const dress = this.state.closet.dress[0]

    if (dress) {
      return (
        <div className={BASE_CLASS} key="dress.id">
          <img className={`${BASE_CLASS}__image`} src={dress.imageURL} />
          <h2 className={`${BASE_CLASS}__title`}>{dress.name}</h2>
          <div className={`${BASE_CLASS}__info`}>
            <div className={`${BASE_CLASS}__info__cost`}>
              <div>
                original cost: <span>${dress.cost}</span>
              </div>
              <div>
                wears: <span>{dress.wearCount} </span>{' '}
              </div>
              <div>
                cost per wear:
                <span>
                  ${Math.round(dress.cost / dress.wearCount * 100) / 100}{' '}
                </span>
              </div>
            </div>

            <div className={`${BASE_CLASS}__info__buttons`}>
              {/* <button className={`${BASE_CLASS}__info__buttons__button`}> */}
              <Link to={{pathname: `/closet/${dress.id}/edit`, state: dress}}>
                edit
              </Link>

              <button
                className={`${BASE_CLASS}__info__buttons__button`}
                onClick={() => this.showModal(dress.id)}
              >
                remove
              </button>
              <button
                className={`${BASE_CLASS}__info__buttons__button`}
                onClick={() => {
                  this.addWear(dress.id)
                }}
              >
                {' '}
                add wear{' '}
              </button>
            </div>
          </div>
          {this.state.utils.isModalOpen ? (
            <RemoveConfirmationModal
              handleCancel={this.handleCancel}
              handleAccept={this.handleAccept}
              dressId={dress.id}
            />
          ) : null}
        </div>
      )
    } else {
      return <h1>Sorry no dress found</h1>
    }
  }
}

const mapState = state => {
  return {
    dresses: state.closet.dresses
  }
}

export default connect(mapState)(ArticleContainer)
