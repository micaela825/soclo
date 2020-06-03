import * as d3 from 'd3'
import React from 'react'

const SimplePieChart = ({percentage}) => {
  const data = [percentage, 100 - percentage || 0]
  console.log('data', data)
  const height = 200
  const width = 200
  let pie = d3.pie()(data)

  return (
    <>
      <div style={{marginBottom: -200, zIndex: 99, fontSize: 28}}>
        {percentage > 90 && '🎉'}
      </div>
      <svg height={height} width={width}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          <Slice pie={pie} />
        </g>
      </svg>
    </>
  )
}

const Slice = props => {
  let {pie} = props
  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100)

  let interpolate = d3.interpolateRgb('#eb1736', '#5252d4')

  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1))
    return <path d={arc(slice)} fill={sliceColor} />
  })
}

export default SimplePieChart
