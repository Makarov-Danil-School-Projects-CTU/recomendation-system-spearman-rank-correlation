import React, { useMemo, useState } from 'react'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from './StableRate.module.css'

const StableRate = ({ count, rating }) => {
  const color = {
    filled: '#f5eb3b',
    unfilled: '#DCDCDC',
  }

  const [hoverRating, _] = useState(0)
  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled
    } else if (!hoverRating && rating >= index) {
      return color.filled
    }

    return color.unfilled
  }

  const starsRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          icon={faStar}
          className='fa-xl'
          style={{ color: getColor(idx), cursor: 'pointer' }}
        />
      ))
  }, [count, rating, hoverRating])

  return (
    <div className={s.tooltip}>
      {starsRating}
      <span className={s.tooltiptext}>Average rating: {parseFloat(rating).toFixed(3)}</span>
    </div>
  )
}

export default StableRate
