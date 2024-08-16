import FollowCard from "./follow-card";
import { GoDotFill } from "react-icons/go";
import "./follow.css"

const FollowSideBare=()=>{
    return(
        <div className="ms-3 p-2 border border-2 border-top-0" style={{width:"250px"}}>
            <div className="d-flex justify-content-between">
                <h6 className="fw-semibold fs-6">Follow more</h6>
                <i class="bi bi-chevron-right arrow-icons"></i>
            </div>
            <div>
                <FollowCard/>
                <FollowCard/>
                <FollowCard/>
                <FollowCard/>
            </div>
            <div className="card text-center">
                <div>
                    <p className="fw-bold">Your pages</p>
                    <img src="https://www.thesmbguide.com/images/spine-payroll-1024x512-20190228.png" 
                    alt=""
                    width="200px"
                    />
                    {/* <span className="fw-bold">Ambi<span style={{color:"orange"}}>Spine<br/>Technologies</span></span> */}
                </div>
                <div className="card-body" style={{height:"200px;"}}>

                </div>
                <div>
                    <h6 className="fw-bold"><span className="text-dark">+3:</span><span className="text-primary">Review</span></h6>
                    <select className="border-0 fw-semibold">
                            <option>More</option>
                            <option>Nature</option>
                            <option value="">Social</option>
                            </select>
                </div>
            </div>
            <div className="card card-2  text-center">
                <div className="card-body">
                    <div className="fw-bold">
                        <span>Spread room</span>
                        <i class="bi bi-chevron-right ms-3 arrow-icons"></i>
                    </div>
                    <p className="text-danger fw-bold">Live <GoDotFill/></p>
                </div>
               
            </div>
            <div className="f-content">
                <p className="text-primary">
                    Terms of service Privacy Policy Cookie Policy Accordingly Adds Of info More.
                </p>
                <p className="text-secondary">@ 2024 ambispinetechnologies</p>
            </div>
        </div>
    )
}

export default FollowSideBare;