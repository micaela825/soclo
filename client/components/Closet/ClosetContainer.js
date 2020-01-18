import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDresses} from '../../store/closet'
import store from '../../store'
import axios from 'axios'
import './index.scss'

const baseClass = 'closet-container'

class ClosetContainer extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.removeDress = this.removeDress.bind(this)
  }

  async removeDress(dressId) {
    // before onClick, have confirmation pop-up - ask if want to remove dress. if no, route back to /closet, if yes, continue with delete dress
    await axios.delete(`api/closet/${dressId}`).then(
      this.setState({
        dresses: this.state.closet.dresses.filter(dress => dress.id !== dressId)
      })
    )
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
        <div className={`${baseClass}_title`}>user closet</div>

        <div className={`${baseClass}_nav`}>
          <Link to="/add">
            <div className={`${baseClass}_menu-button`}>filter</div>
          </Link>
          <Link to="/add">
            <div className={`${baseClass}_menu-button`}>sort</div>
          </Link>
          <Link to="/add">
            <div className={`${baseClass}_menu-button`}>add an item </div>
          </Link>
        </div>
        <div className={`${baseClass}_table`}>
          {this.state.closet.dresses
            ? this.state.closet.dresses.map((dress, i) => (
                <div className={`${baseClass}_item`}>
                  <Link to={`/closet/${dress.id}`}>
                    <div className={`${baseClass}_name-body`}>{dress.name}</div>
                    <div className={`${baseClass}_image-body`}>
                      <img src={dress.imageURL} height="240" width="160" />
                    </div>
                  </Link>
                  <div className={`${baseClass}_buttons`}>
                    <Link to="/edit">edit</Link>
                    <button onClick={() => this.addWear(dress)}>
                      {/* <button onClick={() => setWearCount(wearCount + 1)}> */}
                      add wear
                    </button>

                    <div
                      className={`${baseClass}_remove-button`}
                      onClick={() => this.removeDress(dress.id)}
                    >
                      remove
                    </div>
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
    getDresses: () => dispatch(getDresses())
  }
}

export default connect(mapState, mapDispatchToProps)(ClosetContainer)

// TODO:
// remove dress - confirm pop up, redirect to closet on confirmation
