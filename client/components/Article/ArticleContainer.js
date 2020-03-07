import React, {Component, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import store from '../../store'
import {getSingleDress, addWear} from '../../store/closet'
import './index.scss'

const BASE_CLASS = 'article'

export default class ArticleContainer extends Component {
  constructor() {
    super()
    this.state = store.getState()
    this.removeDress = this.removeDress.bind(this)
  }

  async componentDidMount() {
    const dressId = this.props.match.params.dressId
    store.dispatch(getSingleDress(dressId))
    this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }
  async removeDress(dressId) {
    // confirm('are you sure?')
    if (confirm('are you sure you want to remove this dress?')) {
      await axios.delete(`/api/closet/${dressId}`).then(() => {
        console.log('redirecting')
        Redirect()
      })
      // route back to closet page
    } else console.log('cancelled!')
  }

  async Redirect() {
    return <Redirect to="/closet" />
  }

  async addWear(dressId) {
    store.dispatch(addWear(dressId))
    const dressToIncrement = await this.state.closet.dresses.filter(
      dress => dress.id === dressId
    )
    dressToIncrement[0].wearCount += 1
  }

  render() {
    const dress = this.state.closet.dress[0]

    if (dress) {
      return (
        <div className={BASE_CLASS} key="dress.id">
          <img className={`${BASE_CLASS}__image`} src={dress.imageURL} />
          <div className={`${BASE_CLASS}__info`}>
            <h2 className={`${BASE_CLASS}__info__title`}>{dress.name}</h2>
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
              <Link to={{pathname: `/closet/${dress.id}/edit`, state: dress}}>
                edit
              </Link>
              <button
                className={`${BASE_CLASS}_remove-button`}
                onClick={() => this.removeDress(dress.id)}
              >
                remove
              </button>
              <button
                className={`${BASE_CLASS}_remove-button`}
                onClick={() => {
                  this.addWear(dress.id, setWear(19))
                }}
              >
                {' '}
                add wear{' '}
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>Sorry no dress found</h1>
    }
  }
}
