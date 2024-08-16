import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import './App.css';
import Sidebar from './layouts/Sidebar/sidebar';
import Header from './layouts/header/header';
import { Routes, Route, Navigate } from 'react-router-dom';
import WebFont from "webfontloader";
import Loading from './layout/loading.jsx';
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions.js';
import store from "./store.js";
import UpdateProfile from './components/Profile/UpdateProfile.jsx';
import ProfileInfo from './components/Profile/ProfileInfo.jsx';
import ProtectedRoute from './Route/ProtectedRoute.jsx'; 
import Footer from './layouts/Footer/footer.jsx';
import Home from './layouts/Home/home.js';
// Lazy loaded components
const Profile = lazy(() => import('./components/Profile/profile'));
const UserRegister = lazy(() => import('./components/Auth/Register/UserRegister'));
const ExploreComponent = lazy(() => import('./components/Explore/ExploreComponent'));
const UserLogin = lazy(() => import('./components/Auth/Login/UserLogin'));
const VideoCarsoule = lazy(() => import('./pages/VideoCarsoule'));
const HomePageComponent = lazy(() => import('./components/Home/home'));
const JobComponent = lazy(() => import('./components/Job/Job'));
const ChatListBox = lazy(() => import('./components/Message/ChatListBox.jsx'));
const Spread_Post = lazy(() => import('./components/spread_post/Spread_Post'));
const Cantact_Spread = lazy(() => import('./components/Community/Cantact_Spread'));
const EventCard = lazy(() => import('./components/Event/EventCard.js'));
const Audio = lazy(() => import('./components/Audiolive/Audio'));
const StoryCarosuel = lazy(() => import('./components/carosuel/storycarosuel'));
const Followers = lazy(() => import('./components/Community/followers'));
const Following = lazy(() => import('./components/Community/following'));
const ChatHome = lazy(() => import('./components/Message/ChatHome.jsx'));
const MassageBox = lazy(() => import('./components/Message/conversation/massage/massage.jsx'));
const CommentsComponent = lazy(() => import('./components/Comment/CommentsComponents.jsx'));

const NotFound = lazy(() => import("./pages/NotFoundComponent"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const  MessageManagement = lazy(() => import("./pages/Admin/MessageManagement"))
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagement"));

const sampleComment = {
  text: 'This is a comment.',
  replies: [
    {
      text: 'This is a reply.',
      replies: [
        {
          text: 'This is a nested reply.'
        }
      ]
    }
  ]
};

function App() {
  const [sideBar, setSideBar] = useState(false);
  const scrollableContentRef = useRef(null);
  const { loading,isAuthenticated} = useSelector((state) => state.user);

  const handleScroll = () => {
    if (scrollableContentRef.current) {
      const scrollTop = window.scrollY;
      const newHeight = 100 + scrollTop * 0.1;
      scrollableContentRef.current.style.height = `${newHeight}vh`;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <div className="App">
      {isAuthenticated && <>
        <Header toggleOpen={toggleSideBar} />
      <div className={`tab-group ${sideBar ? 'show' : ''}`}>
        <Sidebar toggleClose={toggleSideBar} />
      </div>
      </>
      }

      <section className='section-container'>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            {!isAuthenticated && <Route path="/" element={<Home/>} />}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePageComponent scrollableContentRef={scrollableContentRef} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/info/:id" element={<ProfileInfo />} />
              <Route path="/comment/:id" element={<CommentsComponent/>} />
              <Route path="/me/update" element={<UpdateProfile/>} />
              <Route path="/video" element={<VideoCarsoule />} />
              <Route path="/explore" element={<ExploreComponent />} />
              <Route path="/connected" element={<Cantact_Spread />} />
              <Route path="/spread" element={<Spread_Post />} />
              <Route path="/message" element={<ChatHome/>} />
              <Route path="/chat/:id" element={<MassageBox />} />
              <Route path="/event" element={<EventCard />} />
              <Route path="/job" element={<JobComponent />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/video-slide" element={<StoryCarosuel />} />
              <Route path="/followers" element={<Followers />} />
              <Route path="/following" element={<Following />} />
            </Route>

            <Route path='*' element={<NotFound/>} />
            <Route path='/admin' element={<AdminLogin/>} /> 
            <Route path='/admin/dashboard' element={<Dashboard/>} />     
            <Route path='/admin/chat-management' element={<ChatManagement/>} />   
            <Route path='/admin/messages-management' element={<MessageManagement/>} />   
            <Route path='/admin/user' element={<UserManagement/>} />   
          </Routes>
        </Suspense>
      </section>
    </div>
  );
}

export default App;
