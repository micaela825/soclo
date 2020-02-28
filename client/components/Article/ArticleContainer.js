import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import store from '../../store'
import {getSingleDress} from '../../store/closet'
import './index.scss'

export default class ArticleContainer extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  async componentDidMount() {
    const dressId = this.props.match.params.dressId
    store.dispatch(getSingleDress(dressId))
    this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const dress = this.state.closet.dress[0]
    const BASE_CLASS = 'article'

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
              <button>remove</button>
              <button> add wear </button>
            </div>
          </div>
        </div>
      )
    } else {
      return <h1>Sorry no dress found</h1>
    }
  }
}
