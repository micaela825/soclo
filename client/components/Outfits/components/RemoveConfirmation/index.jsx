import React from 'react'
// import './index.scss'
const BASE_CLASS = 'remove-confirmation-modal'

class RemoveConfirmation extends React.Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div className={BASE_CLASS}>
        <div className={`${BASE_CLASS}__prompt`}>
          are you sure you want to remove this item?
        </div>
        <div className={`${BASE_CLASS}__buttons`}>
          <button
            type="button"
            className={`${BASE_CLASS}__buttons__button`}
            onClick={() => {
              this.props.handleDeleteOutfitAccept(this.props.outfitId)
              window.location.href = '/outfits'
            }}
          >
            yes
          </button>
          <button
            type="button"
            className={`${BASE_CLASS}__buttons__button`}
            onClick={this.props.handleDeleteOutfitCancel}
          >
            cancel
          </button>
        </div>
      </div>
    )
  }
}

export default RemoveConfirmation
