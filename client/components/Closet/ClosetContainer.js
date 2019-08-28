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
  constructor() {
    super()
    this.state = store.getState()
    this.removeDress = this.removeDress.bind(this)
  }

  removeDress(dressId) {
    axios.delete(`api/dresses/${dressId}`)
    this.setState({
      dresses: this.state.closet.dresses.filter(dress => dress.id !== dressId)
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
    return (
      <div id="user-container">
        <Link to="/add">Add An Item</Link>
        <h1>user closet</h1>
        <Table>
          {this.props.dresses
            ? this.props.dresses.map((dress, i) => (
                <Item>
                  <NameBody>{dress.name}</NameBody>
                  <ImageBody>
                    <img src={dress.imageURL} height="200" width="150" />
                  </ImageBody>
                  <DescBody>{dress.description}</DescBody>
                  <Buttons>
                    <EditButton onClick={() => this.removeDress(dress.id)}>
                      edit
                    </EditButton>
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
