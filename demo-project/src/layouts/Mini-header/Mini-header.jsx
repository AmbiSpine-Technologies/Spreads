import React from 'react'
import "./mini.css"
import { AiFillAudio } from "react-icons/ai";
import { IoOptionsOutline } from "react-icons/io5";

const tabs= [
    {name:"Trending"},
    {name:"Reels"},
    {name:"Post"},
    {name:"Audios"},
    {name:"Videos"},
]
const MiniHeader = () => {

    const handlerButton=(index)=>{
        console.log(index)
    }
  return (
    <div className='mini-container'>

        <form action="">
            <input type="text" placeholder='Search' />
            <IoOptionsOutline className='mt-2 fs-5 me-2'/>
            <AiFillAudio className='mt-2 fs-5 me-2'/>
           
        </form>
        <div className='tab-groups'>
        {
            tabs.map((tab,index)=>(
                <button className='btns' onClick={()=>handlerButton(index)}>
                    {tab.name}
                </button>
                ))
            }
        </div>
    </div>
  )
}

export default MiniHeader