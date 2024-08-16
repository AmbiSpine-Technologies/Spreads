import React from 'react';
import PropTypes from 'prop-types'; // Optional, for type checking

const SearchCard = ({ avatar, firstName, lastName,username }) => {
  // Handle the case where profileImage might be an empty array or undefined
  const profileImageUrl = avatar?.[0]?.url || 'default-avatar-url.jpg'; 

  return (
    <div className='d-flex p-1 gap-3 align-items-center' style={{borderBottom:"1px solid #fff"}}>
      <img
          src={profileImageUrl}
          alt='Profile'
          width="40"
          height="40"
          className='rounded-circle'
        />
      <div className='d-flex flex-column'>
        <span className='text-primary' style={{fontSize:"0.8rem"}}>{firstName} {lastName}</span>
        <small className='text-muted'style={{fontSize:"0.7rem"}} >{username}</small>
      </div>
    </div>
  );
};

// PropTypes for type checking (optional)
SearchCard.propTypes = {
  profileImage: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string
  })),
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

export default SearchCard;
