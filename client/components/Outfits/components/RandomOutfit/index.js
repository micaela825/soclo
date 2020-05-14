import React from 'react'
import './index.scss'
const BASE_CLASS = 'random-outfit'

export default function RandomOutfit({
  top,
  bottom,
  shoes,
  handleBtnClick,
  handleClick
}) {
  console.log('top', top, 'bottom', bottom, 'shoes', shoes)
  return (
    <div className={BASE_CLASS}>
      <img src={top} className={`${BASE_CLASS}__top`} />
      <img src={bottom} className={`${BASE_CLASS}__bottom`} />
      <img src={shoes} className={`${BASE_CLASS}__shoes`} />
      <button
        type="button"
        onClick={handleClick}
        className={`${BASE_CLASS}__shuffleBtn`}
      >
        random!!!
      </button>
      <button
        type="button"
        onClick={handleBtnClick}
        className={`${BASE_CLASS}__closeBtn`}
      >
        close
      </button>
    </div>
  )
}
