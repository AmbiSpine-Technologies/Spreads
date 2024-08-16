import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus,faNewspaper, faUserFriends, faAddressBook, faCalendarAlt, faEnvelope, faFileAlt, faHashtag } from '@fortawesome/free-solid-svg-icons';
import './community.css'; 

const CommunityComponent = () => {
  return (
    <div className="Communitysidebar list-group mt-3 border-0">
      <NavLink to="/community" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faUsers} className="fa-icon" /> Community
      </NavLink>
      <NavLink to="/following" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faUserPlus} className="fa-icon" /> Following
      </NavLink>
      <NavLink to="/followers" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faUserFriends} className="fa-icon" /> Followers
      </NavLink>
      <NavLink to="/contacts" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faAddressBook} className="fa-icon" /> Contacts
      </NavLink>
      <NavLink to="/news-events" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faCalendarAlt} className="fa-icon" /> Events
      </NavLink>
      <NavLink to="/news-feed" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faNewspaper} className="fa-icon" /> News Feed
      </NavLink>
      <NavLink to="/newsletter" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faEnvelope} className="fa-icon" /> Newsletter
      </NavLink>
      <NavLink to="/pages" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faFileAlt} className="fa-icon" /> Pages
      </NavLink>
      <NavLink to="/hashtags" className="list-group-item list-group-item-action">
        <FontAwesomeIcon icon={faHashtag} className="fa-icon" /> Hashtags
      </NavLink>
    </div>
  );
}

export default CommunityComponent;
