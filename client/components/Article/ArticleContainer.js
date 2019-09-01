import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import store from '../../store'
import {getSingleDress} from '../../store/closet'

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

    if (dress) {
      return (
        <div>
          <div className="dress" key="dress.id" />
          <div>
            <h4>Name:</h4>
            <h5>{dress.name}</h5>
            <img src={dress.imageURL} height="200" width="150" />
            <h5>{dress.description}</h5>
          </div>
        </div>
      )
    } else {
      return <h1>Sorry no dress found</h1>
    }
  }
}
