import React, { useState, useRef, useEffect } from "react";
import "./header.css";
import { MdNotificationsActive } from "react-icons/md";
import { BsSuitcaseLgFill, BsPersonCheckFill } from "react-icons/bs";
import Notification from "../../components/Notification/notification";
import { Link, NavLink } from "react-router-dom";
import { searchUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import { useOutsideClick } from "../../utlis/useOutsideClick";

const Header = ({ toggleOpen }) => {
  const [notify, setNotify] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const notificationRef = useRef(null);
  const searchBoxRef = useRef(null);
  const searchResultsRef = useRef(null);

  const { searchResults, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notification);

  useEffect(() => {
    if (search.trim()) {
      dispatch(searchUser(search.trim()));
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [search, dispatch]);

  const handleNotificationToggle = () => {
    setNotify((prev) => !prev);
  };

  useOutsideClick(notificationRef, () => setNotify(false));
  useOutsideClick(searchBoxRef, (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  });

  return (
    <header className="d-flex justify-content-between p-2 mt-2">
      <nav className="d-flex">
        <div 
          className="logo ms-4 me-3" 
          onClick={toggleOpen}
          ref={notificationRef}
        >
          <img
            src={user?.avatar[0]?.url || "https://live.staticflickr.com/65535/49627006528_4eabfb3cdd_z.jpg"}
            className="rounded-img"
            alt="User Avatar"
          />
        </div>
        <div className="search-box" ref={searchBoxRef}>
          <form className="relative d-flex position-relative">
            <span className="search-icon bi bi-search position-absolute"></span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="search-input"
            />
          </form>
          {showSearchResults && (
            <div className="search-box-card" ref={searchResultsRef}>
              {searchResults?.length > 0 ? (
                searchResults.map((user) => (
                  <Link 
                    to={`profile/info/${user._id}`} 
                    key={user._id} 
                    className="text-decoration-none p-2"
                  >
                    <SearchCard
                      avatar={user?.avatar}
                      firstName={user?.firstName}
                      lastName={user?.lastName}
                      username={user?.username}
                    />
                  </Link>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="left-icons">
        <nav className="d-flex gap-3 border-0">
          <div>
            <NavLink
              to="/connected"
              className="d-flex justify-content-center text-decoration-none text-center flex-column align-items-center"
            >
              <BsPersonCheckFill className="fs-3" />
            </NavLink>
          </div>
          <div className="h-notification position-relative" onClick={handleNotificationToggle}>
            <NavLink
              to="#"
              className="d-flex text-decoration-none text-center justify-content-center flex-column align-items-center"
            >
              <MdNotificationsActive className="fs-3" />
            </NavLink>
            {notifications?.length > 0 && (
              <span className="position-absolute  start-100 translate-middle p-1
               bg-danger border border-light top-0 rounded-5 rounded-circle" style={{marginLeft:"-25px"}}>
               <span className="text-small text-white fw-semibold">{notifications.length}</span>
              </span>
            )}
          </div>
          {notify && (
            <div ref={notificationRef} className="notification-page">
              <Notification />
            </div>
          )}
          <div>
            <NavLink
              to="/job"
              className="d-flex justify-content-center text-decoration-none text-center flex-column align-items-center"
            >
              <BsSuitcaseLgFill className="fs-3" />
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
