import React from 'react'
import './TrendCard.css'    
import{TrendData} from '../../Data/TrendData'

const TrendCard = () => {
  return (
    <div className="TrendCart felx flex-col gap-4 p-4 rounded-2xl pl-4" style={{backgroundColor: 'var(--cardColor)'}}>
        <b><h1>Trends For You </h1></b>

        {TrendData.map((trend)=> {
            return (
                <div className="Trend flex flex-col pb-4">
                    <span>#{trend.name}</span>
                    <span>{trend.shares}k shares</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendCard