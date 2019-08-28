// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {addDress} from '../../store/closet'

// class ArticleContainer extends Component {
//   constructor() {
//     super()
//     this.state = {
//       imageURL: '',
//       name: '',
//       description: ''
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     this.props.addDress(this.state)
//     this.props.addingDress(this.state)

//     this.setState({
//       imageURL: '',
//       name: '',
//       description: ''
//     })
//   }

//   render() {
//     // console.log('this.state in addDress render', this.state)
//     return (
//       <div>
//         add a dress
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             <small>url image</small>
//             <input
//               name="imageURL"
//               type="text"
//               value={this.state.imageURL}
//               onChange={this.handleChange}
//             />
//           </label>

//           <label>
//             <small>dress name</small>
//             <input
//               name="name"
//               type="text"
//               value={this.state.name}
//               onChange={this.handleChange}
//             />
//           </label>

//           <label>
//             <small>description</small>
//             <input
//               name="description"
//               type="text"
//               onChange={this.handleChange}
//               value={this.state.description}
//             />
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     )
//   }
// }

// const mapState = state => {
//   return {
//     dress: state.dress
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     addDress: dress => dispatch(addDress(dress))
//   }
// }
// export default connect(mapState, mapDispatch)(ArticleContainer)
