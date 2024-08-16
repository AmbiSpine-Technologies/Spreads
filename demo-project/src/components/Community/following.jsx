import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./community.css";
import Userprofile from './Userprofile'; 
import { useDispatch, useSelector } from "react-redux";
import {getAllFollowingUsers } from "../../actions/userActions";

export default function Following() {
  const dispatch = useDispatch();

  const { loading, followedUsers, error } = useSelector(state => state.allFollow);
  const {user} = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(getAllFollowingUsers());
  }, [dispatch]);
  return (
    <div className='Community-Container'>
      <div className="card"> 
        <div className="card-body">
          <h5 className="fw-bold fs-6  mx-3 pt-3">{user?.firstName}'s Network</h5>
          <hr />
          <div className="nav">
            <NavLink to="/followers" className="nav-link" activeClassName="active">
              Followers
            </NavLink>
            <NavLink to="/following" className="nav-link" activeClassName="active">
              Following
            </NavLink>
          </div>
          <hr />
          <p className="mx-3 pt-1 text-secondary fs-6 fw-normal">
            You are following {followedUsers?.followedUsers?.length} people out of your network</p>
          <div className="d-flex flex-column g-4">
          {
              followedUsers?.followedUsers?.map((user,index)=>(
                <Userprofile user={user} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
