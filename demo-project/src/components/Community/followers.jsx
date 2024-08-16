import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./community.css";
import Userprofile from './Userprofile'; // Ensure this import is correct
import { useDispatch, useSelector } from "react-redux";
import { getAllFollowedUsers } from "../../actions/userActions";

export default function Followers() {
  const dispatch = useDispatch();

  const { loading, followedUsers, error } = useSelector(state => state.allFollow);
  const {user} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllFollowedUsers());
  }, [dispatch]);
  return (
    <div className='Community-Container'>
      <div className="card"> 
        <div className="card-body">
          <h5 className="fw-bold fs-6  mx-3 pt-3">{user?.firstName}'s Network</h5>
          <hr />
          <div className="nav positon-relative">
            <NavLink to="/followers" className="nav-link" activeClassName="active">
              Followers
            </NavLink>
            <NavLink to="/following" className="nav-link" activeClassName="active">
              Following
            </NavLink>
          </div>
          <hr />
        <div className="">
        <p className="mx-3 pt-1 text-secondary fs-6 fw-normal">{followedUsers?.followedUsers?.length} people are following you</p>
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
    </div>
  );
}
