import React from 'react'
import FollowCard from '../../pages/Card/follow_sidebar/follow-card'
import Spread_news from '../../pages/Card/Spread-news'
import NetworkCard from '../../pages/Card/Network-Card'

function Main_Left() {
  return (
    <div className="main-right d-flex flex-column justify-content-center align-items-center"
    
    >
   <FollowCard/>
    <Spread_news/>
   <NetworkCard/>
    </div>
  )
}

export default Main_Left