import React, { Fragment, useEffect } from "react";
import {CgMouse} from "react-icons/cg"
import "./home.css"
import {NavLink} from "react-router-dom"


const Home =()=>{
     
    return <Fragment>
          <div className="banner-home">
             < p>Welcome to Aspin Techonology</p>
             <h1>FIND Access BELOW</h1>
  
             <a href="#container">
              <button>
                  Scroll <CgMouse/>
              </button>
             </a>
          </div>
  
  
          <div className="container gap-3 d-flex flex-column justify-content-center align-items-center" id="container">
          <div className="mt-2 mb-2">
          <NavLink to="login" 
           className="btn btn-outline-danger rounded-5 p-2">
            Access To Login</NavLink>
          </div>
           <div>
           <NavLink to="admin"
           className="btn btn-outline-primary rounded-5 p-2"
           >Access To Admin</NavLink>
           </div>
        </div>
    </Fragment>
}

export default Home;