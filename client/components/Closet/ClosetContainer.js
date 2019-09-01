import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getDresses} from '../../store/closet'
import store from '../../store'
import axios from 'axios'
import {
  Table,
  Item,
  NameBody,
  ImageBody,
  DescBody,
  Buttons,
  RemoveButton,
  EditButton
} from './Closet.style'

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
      <div id="user-container">
        <Link to="/add">Add An Item</Link>
        <h1>user closet</h1>
        <Table>
          {this.state.closet.dresses
            ? this.state.closet.dresses.map((dress, i) => (
                <Item>
                  <Link to={`/closet/${dress.id}`}>
                    <NameBody>{dress.name}</NameBody>
                    <ImageBody>
                      <img src={dress.imageURL} height="200" width="150" />
                    </ImageBody>
                  </Link>
                  <Buttons>
                    <Link to="/edit">edit</Link>
                    <RemoveButton onClick={() => this.removeDress(dress.id)}>
                      remove
                    </RemoveButton>
                  </Buttons>
                </Item>
              ))
            : null}
        </Table>
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
