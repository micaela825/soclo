import React, {Component, useState} from 'react'
import {Link, Route} from 'react-router-dom'
import axios from 'axios'
import store from '../../store'
import {setIsModalOpen} from '../../store/utils'
import {getSingleDress, addWear} from '../../store/closet'
import './index.scss'
import RemoveConfirmationModal from '../RemoveConfirmation'
import {connect} from 'react-redux'
import classnames from 'classnames'

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

          <div className={`${BASE_CLASS}__title`}>{dress.name}</div>
          <div className={`${BASE_CLASS}__info`}>
            <div className={`${BASE_CLASS}__info__title`}>original cost:</div>
            <div className={`${BASE_CLASS}__info__figure`}>${dress.cost}</div>
            <div className={`${BASE_CLASS}__info__title`}>wears:</div>
            <div className={`${BASE_CLASS}__info__figure`}>
              {dress.wearCount}{' '}
            </div>
            <div className={`${BASE_CLASS}__info__title`}>cost per wear:</div>
            <div className={`${BASE_CLASS}__info__figure`}>
              ${Math.round(dress.cost / dress.wearCount * 100) / 100}
            </div>
          </div>
          <div className={`${BASE_CLASS}__buttons`}>
            {/* <button className={`${BASE_CLASS}__info__buttons__button`}> */}
            <button
              className={classnames(
                `${BASE_CLASS}__buttons__button`,
                `${BASE_CLASS}__buttons__button__add`
              )}
              onClick={() => {
                this.addWear(dress.id)
              }}
            >
              add wear
            </button>
            <Link
              to={{pathname: `/closet/${dress.id}/edit`, state: dress}}
              className={classnames(
                `${BASE_CLASS}__buttons__button`,
                `${BASE_CLASS}__buttons__button__edit`
              )}
            >
              edit
            </Link>
            <button
              className={classnames(
                `${BASE_CLASS}__buttons__button`,
                `${BASE_CLASS}__buttons__button__remove`
              )}
              onClick={() => this.showModal(dress.id)}
            >
              remove
            </button>
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
