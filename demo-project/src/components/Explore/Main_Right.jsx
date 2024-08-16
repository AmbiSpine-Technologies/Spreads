import React from 'react'
import ProfileCard from '../../pages/Card/Profile-Card'
import TextCard from '../Profile/Spread/TextCard'
import Spreadslive from '../../pages/Card/Spreads-live'
import EventsCard from '../../pages/Card/Events-Card'

function Main_Right() {
  return (
    <div className="main-left d-flex flex-column justify-content-center align-items-center">
   <ProfileCard/>
   <TextCard/>
   <Spreadslive/>
   <EventsCard/>
   </div>
  )
}

export default Main_Right