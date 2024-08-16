import React, { useState } from 'react';
import MatchCard from '../../pages/Card/matchCard';
import CommunityComponent from './community';
import { NavLink } from "react-router-dom";
import CantactProfile from './ContactProfile';
import { initialProfiles } from "./../Profile/profile";

const Cantact_Spread = ({ scrollableContentRef }) => {
    const title = "Top Spreads";
    const [profiles, setProfiles] = useState(initialProfiles);

    const handleFollowToggle = (id, isFollowing) => {
        // Update the follow state of the profile with the given id
        setProfiles(profiles.map(profile => 
            profile.id === id ? { ...profile, isFollowing: isFollowing } : profile
        ));
    };

    return (
        <div className="container-fluid bg-light">
            <div className="row">
                <div className="col-3">
                    <div className="main-left d-flex flex-column align-items-center">
                        <CommunityComponent />
                    </div>
                </div>
                <div className="col-6 mt-4 scrollable-content" ref={scrollableContentRef}>
                    <div className='card p-1 w-100 border-0' style={{ height: "50px" }}>
                        <h3 className='text-secondary fs-6 fw-semibold p-1'>Spread Contact</h3>
                    </div>
                    <main className="bg-white mt-4 row">
                        <div className='d-flex justify-content-around p-2'>
                            <NavLink to="" className="text-decoration-none text-secondary fs-6 fw-semibold">
                                Recommended
                            </NavLink>
                            <NavLink to="" className="text-decoration-none text-secondary fs-6 fw-semibold">
                                For You
                            </NavLink>
                            <NavLink to="" className="text-decoration-none text-secondary fs-6 fw-semibold">
                                Creators
                            </NavLink>
                        </div>
                        <hr />
                        <div className='mt-3'>
                            <CantactProfile />
                            <CantactProfile />
                            <CantactProfile />
                            <CantactProfile />
                            <CantactProfile />
                            <CantactProfile />
                        </div>
                    </main>
                </div>
                <div className="col-3">
                    <div className="main-left d-flex flex-column align-items-center" style={{ marginTop: "1rem" }}>
                        <MatchCard title={title} profiles={profiles} onFollowToggle={handleFollowToggle} />
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cantact_Spread;
