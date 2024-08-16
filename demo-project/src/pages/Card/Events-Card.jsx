import React from 'react'

const EventsCard = () => {
  return (
    <div className='card' style={{height:'300px'}}>
        <div className='d-flex justify-content-between p-3'>
            <h5 style={{color:'gray',fontSize:"15px"}}>Events</h5>
            <i class="bi bi-plus-lg fs-5 text-primary fs-5 ms-3"></i>
        </div>
        <div className='card-body text-left'>
            <div className='mb-4'>
                <p style={{fontSize:'16px'}}>Upcomming</p>
            </div>
            <div >
                <p style={{fontSize:'16px'}}>Privious</p>
            </div>
        </div>
        <a href="">See more</a>
    </div>
  )
}

export default EventsCard