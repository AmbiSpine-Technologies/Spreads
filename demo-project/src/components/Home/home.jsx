import React, { useEffect, useState } from "react";
import "./home.css";
import ProfileCard from "../../pages/Card/Profile-Card";
import Spread_News from "../../pages/Card/Spread-news";
import FollowCard from "../../pages/Card/follow_sidebar/follow-card";
import Loading from "../../layout/loading";
import RepostCard from "./RepostCard";
import StoryUserCarousel from './../carosuel/storyuserprofilecarousel';
import PostHome from "../../components/Post/PostHome.js";
import { useDispatch, useSelector } from 'react-redux';
import { ALLGetPosts, clearErrors, toggleRefresh } from '../../actions/postAction';
import { getAllUsers } from "../../actions/userActions";

const HomePageComponent = ({ scrollableContentRef }) => {
  const [reposts, setReposts] = useState([]);
  const [isStory, setStory] = useState(false);

  const handleRepost = (repost) => {
    setReposts([repost, ...reposts]);
  };

  const StoryClick = () => {
    setStory(!isStory);
  };

  const dispatch = useDispatch();
  const { refresh } = useSelector((state) => state.refresh);
  const { users } = useSelector((state) => state.allUsers);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getAllUsers(user._id));
      dispatch(ALLGetPosts(user._id));
    }
  }, [dispatch, user._id, isAuthenticated]);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (refresh) {
      dispatch(ALLGetPosts(user._id));
      dispatch(toggleRefresh()); // This line can be moved based on your refresh logic
    }
  }, [dispatch, refresh, user._id]);

  return (
    <div className="container-fluid bg-light">
      <div className="row">
        <div className="col-3">
          <div className="home-left d-flex flex-column justify-content-center align-items-center">
            <ProfileCard />
          </div>
        </div>
        <div className="col-6 scrollable-content" ref={scrollableContentRef}>
          <div className="d-flex gap-5">
            <div onClick={StoryClick} className="position-relative">
              <div className="person person-1">
                <img src="person.jpeg" alt="" className="img-1" />
                <img src="person.jpeg" alt="" className="img-2" />
                <span>1L+</span>
              </div>
              <p>Stories</p>
            </div>
            {isStory && (
              <div className="position-absolute Story-container">
                <StoryUserCarousel />
              </div>
            )}
            <div>
              <div className="person person-1">
                <img src="person.jpeg" alt="" className="img-1" />
                <img src="person.jpeg" alt="" className="img-2" />
                <span>20k</span>
              </div>
              <p>Audio Room</p>
            </div>
            <div>
              <div className="person person-1">
                <img src="person.jpeg" alt="" className="img-1" />
                <img src="person.jpeg" alt="" className="img-2" />
                <span>14k</span>
              </div>
              <p>Video Room</p>
            </div>
          </div>
          <div className="home-center">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostHome onRepost={handleRepost} key={post._id} posts={post} />
              ))
            ) : (
              <p>No posts available</p>
            )}
            {reposts.map((repost, index) => (
              <div className="mt-2" key={index}>
                <RepostCard repost={repost} onRepost={handleRepost} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-3 mt-2">
          <div className="home-right d-flex flex-column justify-content-center align-items-center">
            <FollowCard data={users?.other} />
            <Spread_News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
