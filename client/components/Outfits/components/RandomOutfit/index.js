import React from 'react'
import './index.scss'
const BASE_CLASS = 'random-outfit'

export default function RandomOutfit({
  top,
  bottom,
  shoes,
  dress,
  handleBtnClick,
  handleClick
}) {
  return (
    <div className={BASE_CLASS}>
      <img src={top} className={`${BASE_CLASS}__top`} />
      <img src={bottom} className={`${BASE_CLASS}__bottom`} />
      <img src={shoes} className={`${BASE_CLASS}__shoes`} />
      <img src={dress} className={`${BASE_CLASS}__dress`} />
      <button
        type="button"
        onClick={handleClick}
        className={`${BASE_CLASS}__shuffleBtn`}
      >
        shuffle again
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
