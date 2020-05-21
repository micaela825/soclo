import React, {Component, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDresses, addWear} from '../../store/closet'
import {addOutfit} from '../../store/outfit'
import {setIsModalOpen} from '../../store/utils'
import RemoveConfirmationModal from '../RemoveConfirmation'
import store from '../../store'
import axios from 'axios'
import Loader from '../atoms/Loader'
import AddNoteForm from '../modals/AddNoteForm'
import './index.scss'
import classnames from 'classnames'
import {useInView} from 'react-intersection-observer'

// todo: make character limit in article name

const BASE_CLASS = 'closet'

class ClosetContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...store.getState(),
      singleOutfit: [],
      isSubmitted: false,
      showSuccessIcon: false,
      showNotesForm: false
    }
    this.filterCostMoreThan50 = this.filterCostMoreThan50.bind(this)
    this.sortByCost = this.sortByCost.bind(this)
    this.handleSaveOutfit = this.handleSaveOutfit.bind(this)
    this.addToOutfit = this.addToOutfit.bind(this)
    this.handleNoteSubmit = this.handleNoteSubmit.bind(this)
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

  sortByCost() {
    const sortedDresses = this.state.closet.dresses.sort(function(a, b) {
      return a.cost - b.cost
    })
    this.setState({
      ...this.state,
      dresses: sortedDresses
    })
  }

  filterCostMoreThan50() {
    this.state.closet.dresses.filter(dress => dress.cost > 50)
  }

  addToOutfit(dress) {
    this.state.singleOutfit.push(dress)
  }

  createOutfit() {
    this.setState({isSubmitted: false, showNotesForm: false})
    store.dispatch(addOutfit(this.state.singleOutfit))
    this.setState({isSubmitted: true})
    setTimeout(
      () => this.setState({isSubmitted: false, showSuccessIcon: true}),
      2000
    )
    setTimeout(() => this.setState({showSuccessIcon: false}), 3000)
  }

  handleNoteSubmit(e, note) {
    e.preventDefault()
    this.state.singleOutfit.push({notes: note})
    this.createOutfit()
  }

  handleSaveOutfit() {
    this.setState({
      showNotesForm: true
    })
  }

  componentDidMount() {
    store.dispatch(getDresses())
    this.unsubscribe = store.subscribe(() => this.setState(store.getState))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    console.log('this.state in RENDER', this.state.closet)
    // const [ref, isInView] = useInView({
    //   triggerOnce: true,
    //   rootMargin: '-12%',
    // })
    return (
      <div
        // ref={ref}
        className={classnames(`${BASE_CLASS}`, {
          // [`${BASE_CLASS}--is-showing`]: isInView,
          // [`${BASE_CLASS}--is-hidden`]: !isInView,
        })}
      >
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
            onClick={this.handleSaveOutfit}
            className={`${BASE_CLASS}__menu__button`}
          >
            save outfit
            {this.state.isSubmitted ? <Loader /> : null}
            {this.state.showSuccessIcon ? <div>!!!!!</div> : null}
          </div>

          <div
            onClick={this.sortByCost}
            className={`${BASE_CLASS}__menu__button`}
          >
            sort
          </div>
          <Link to="/add" className={`${BASE_CLASS}__menu__button`}>
            add
          </Link>
        </div>
        {this.state.showNotesForm ? (
          <AddNoteForm
            handleNoteSubmit={this.handleNoteSubmit}
            createOutfit={this.createOutfit}
          />
        ) : null}
        <div className={`${BASE_CLASS}__table`}>
          {this.state.closet.dresses
            ? this.state.closet.dresses.map((dress, i) => (
                <div className={`${BASE_CLASS}__item`} key={i}>
                  <Link
                    to={`/closet/${dress.id}`}
                    className={`${BASE_CLASS}__item__body`}
                  >
                    <div className={`${BASE_CLASS}__item__body__name`}>
                      {dress.name}
                    </div>
                    <div
                      className={`${BASE_CLASS}__item__body__image-container`}
                    >
                      <div
                        className={`${BASE_CLASS}__item__body__image-container__wearcount`}
                      >
                        {dress.wearCount}
                      </div>
                      <img
                        className={`${BASE_CLASS}__item__body__image-container__image`}
                        src={dress.imageURL}
                      />
                    </div>
                  </Link>
                  <div className={`${BASE_CLASS}__item__buttons`}>
                    <Link
                      className={`${BASE_CLASS}__item__buttons__edit`}
                      to={{pathname: `/closet/${dress.id}/edit`, state: dress}}
                    >
                      edit
                    </Link>

                    <div
                      className={`${BASE_CLASS}__item__buttons__addwear`}
                      onClick={() => this.addWear(dress.id)}
                    >
                      {' '}
                      add wear{' '}
                    </div>
                    <div
                      className={`${BASE_CLASS}__item__buttons__addtooutfit`}
                      onClick={() => this.addToOutfit(dress)}
                    >
                      add to outfit
                    </div>

                    {/* <div
                      className={`${BASE_CLASS}__info__buttons__remove`}
                      onClick={() => this.showModal(dress.id)}
                    >
                      remove
                    </div> */}
                  </div>
                  <div className={`${BASE_CLASS}__item__divider`} />
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
