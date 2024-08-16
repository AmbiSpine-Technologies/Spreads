import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link } from "react-router-dom";
import { IoIosShareAlt } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import Carousel from "../carosuel/carousel";
import ChartComponent from "../../layout/chartcomponent";
import TextCard from "./Spread/TextCard.jsx";
import Spread_news from "../../pages/Card/Spread-news";
import NetworkCard from "../../pages/Card/Network-Card";
import MatchCard from "../../pages/Card/matchCard";
import Terms_Service from "../../pages/Card/Terms_Service/Terms_Service";
import ActivitySection from "./ActiveSection";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userActions";

const featuredPosts = [
  {
    category: "science",
    title: "Renewable Energy",
    description: "Solar panels and wind turbines generating renewable energy for green and sustainable future.",
    image: "https://media.istockphoto.com/id/1450272068/photo/wind-sun-and-water-energy.jpg?s=1024x1024&w=is&k=20&c=zmMsbQLf_RcuaKVH4coGYzZuFnD5FFUtTNAEo6yUO8o="
  },
  {
    category: "nature",
    title: "Ecological Call",
    description: "Abstract icon representing the ecological call to recycle and reuse in the form of a pond with a recycling symbol in the middle of a beautiful untouched jungle. 3d rendering.",
    image: "https://media.istockphoto.com/id/1340716614/photo/abstract-icon-representing-the-ecological-call-to-recycle-and-reuse-in-the-form-of-a-pond.jpg?s=1024x1024&w=is&k=20&c=qCgLki6nJ_PUS_4SEQ8Jwrot5BM4XPRUqMP8KkWjFH8="
  },
  {
    category: "science",
    description: "Young woman working on laptop in the nature . Leisure activities / Remote working concept.",
    image: "https://media.istockphoto.com/id/1305227027/photo/woman-relaxing-in-nature-and-using-technology.jpg?s=1024x1024&w=is&k=20&c=LZ8fvDOUuminrmchMm5emL7iSFMFwgl61pnnV2-lIpU="
  },
  {
    category: "nature",
    description: "Man hands holding global network and data customer connection on nature background.",
    image: "https://media.istockphoto.com/id/1165058709/photo/man-hands-holding-global-network-and-data-customer-connection-on-nature-background.jpg?s=1024x1024&w=is&k=20&c=kwbXH16oikt1Kf_6wE6G29F6gUrKB0WaUDgdkKwci1Q="
  },
  {
    category:"nature",
    description:"World sustainable environment concept design.Green earth for Environment Social and Governance. Solving environmental, social and management problems with figure icons.",
    image:"https://media.istockphoto.com/id/1398025593/vector/world-sustainable-environment-concept-design.jpg?s=1024x1024&w=is&k=20&c=07Rm_FWBJKy0BiZFhc3WX3WSU8HcQwogZKiz2eLEq-A="
  },
  {
    category: "feature",
    title: "Future Blogger",
    description: "A fantastic picture of the blogger of the future looking from his workplace to the beautiful view from the window.",
    image: "https://media.istockphoto.com/id/1030419404/photo/sci-fi-blogger-surrounded-by-nature.jpg?s=1024x1024&w=is&k=20&c=JAxAzTT5O6DVagdG9DV2_sBP9TPu1zOEfzRF7ZLxrnw="
  },
  {
    category: "science",
    image: "https://media.istockphoto.com/id/1364083209/photo/technology-in-the-field-digital-tablet.jpg?s=1024x1024&w=is&k=20&c=7sBXnhiZ_GRCtuRMDX2OjBiwEM5wbAuqqkVNE5mWFKk=",
    description: "Technology in the field - digital tablet"
  },
  {
    category: "feature",
    title: "Environmental Examination",
    description: "Biologist environmentalist examining the condition of the forest and the trees. Environmental conservation.",
    image: "https://media.istockphoto.com/id/1323675815/photo/ecologist-on-fieldwork-forester-examines-trees-in-their-natural-condition-in-the-forest-and.jpg?s=1024x1024&w=is&k=20&c=x176k_DhkPkHIptWaioOnEcrbunbGXrwjX7Wg-OBrJM="
  }
];

const btns = [
  { id: 1, title: "Post" },
  { id: 2, title: "Repost" },
  { id: 3, title: "Shows" },
];

export const initialProfiles = [
  {
    id: 1,
    name: "Adity Shrivastava",
    username: "srivastava",
    title: "Entrepreneur",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam omnis amet, distinctio possimus modi rem suscipit sit dignissimos cupiditate nisi.",
    image: "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg",
    isFollowing: false,
  },
  {
    id: 2,
    name: "Rupendra Vishwakarma",
    username: "rupendra_353",
    title: "Entrepreneur",
    description: "i am a normal personal ",
    image: "deposit.jpg",
    isFollowing: false,
  },
  {
    id: 3,
    name: "Akash panday",
    username: "akssh_34",
    title: "Entrepreneur",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg",
    isFollowing: false,
  }
  // ... other profiles
];

const Profile = ({ scrollableContentRef }) => {
  const title = "Prefect Match";
  const [selectedCategory, setSelectedCategory] = useState("feature");
  const [profiles, setProfiles] = useState(initialProfiles);
  

  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.allUsers);
  const { error, loading, user,isAuthenticated } = useSelector((state) => state.user);
  
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);


  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-3">
          <div className="main-left d-flex flex-column align-items-center" style={{ marginTop: "1rem" }}>
            <TextCard />
            <NetworkCard />
          </div>
        </div>
        <div className="col-6 bg-white mt-4 scrollable-content" ref={scrollableContentRef}>
          <main className="profile-container">
            <div className="cover-img">
              <img src={user?.coverImage[0]?.url || "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"} />
              <span className="bi bi-bi-gear-fill"></span>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="avatar-box ms-2">
                  <div className="avatar">
                    <img src={user?.avatar[0]?.url || "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"} alt="" />
                    <FaPlus className="plus-icons fs-4 pb-1" />
                  </div>
                  <div className="d-flex justify-content-center flex-column align-items-left ms-2">
                    <div className="d-flex align-items-center gap-2 mt-1  w-100">
                      <h4 className="fw-bold mt-1" style={{ fontSize: "0.8rem" }}>
                        {user?.firstName} {user?.lastName}</h4>
                      <VscVerifiedFilled className="fs-6  text-primary" />
                    </div>
                    <span className="badge text-bg-light fw-light" style={{ fontSize: "0.6rem" }}>
                    {user?.email}
                    </span>
                    <span className="badge text-bg-light mt-2 fw-light" style={{ fontSize: "0.6rem" }}>
                    {user?.username}
                    </span>
                    <div className="d-flex mt-3">
                      <NavLink to="/followers" className="text-decoration-none ">
                      <div className="text-center">
                        <p>{user?.followers.length}</p>
                        <p className="text-secondary" style={{ fontSize: "0.9rem",marginTop:"-5px" }}>Followers</p>
                      </div>
                      </NavLink >
                      <NavLink to="/following" className="text-decoration-none ms-3" >
                      <div className="text-center ms-3">
                        <p>{user?.following.length}</p>
                        <p className="text-secondary" style={{ fontSize: "0.9rem",marginTop:"-5px" }}>Following</p>
                      </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="profile-content mt-3">
                  <p className="text-muted" style={{fontSize:"1rem", fontFamily:"cursive"}}>
                  {user?.bio}
                  </p>
                  <div className="d-flex flex-row-reverse">
                    <div className="profile-btn float-end">
                      <NavLink to={`/profile/info/${user?._id}`} className="btn btn-warning rounded-5 btn-sm me-4">Info</NavLink>
                      <NavLink to="/me/update" className="btn btn-secondary btn-sm p-1  rounded-5 me-4"
                      >Edit Profile</NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <hr />
          <div className="chart">
            <div className="d-flex justify-content-between">
              <div className="chart-list ms-3">
                <div>
                  <h4>Analytics</h4>
                  <ul>
                    <li>Average views</li>
                    <li>Average Likes</li>
                    <li>Recently Visits</li>
                    <li>Earth Appearances</li>
                    <li>Total time Expand</li>
                  </ul>
                  <select>
                    <option>More</option>
                    <option>Nature</option>
                    <option value="">Social</option>
                  </select>
                </div>
              </div>
              <ChartComponent />
            </div>
          </div>
          <hr />
          <div className="feature d-flex justify-content-left flex-column text-align-left text-left">
            <div className="ms-2">
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="all" selected>All</option>
                <option value="feature">Featured-Post</option>
                <option value="nature">Nature</option>
                <option value="science">Science</option>
              </select>
            </div>
            <div className="mt-2 d-flex ms-3 align-items-center">
              <Carousel posts={featuredPosts} category={selectedCategory} />
            </div>
          </div>
          <div className="mt-3">
            <ActivitySection activities={featuredPosts} />
          </div>
        </div>
        <div className="col-3">
          <div className="main-left d-flex flex-column align-items-center" style={{ marginTop: "1rem" }}>
            <MatchCard data={users.other} title={title} />
            <Spread_news />
            <div>
              <Terms_Service />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

