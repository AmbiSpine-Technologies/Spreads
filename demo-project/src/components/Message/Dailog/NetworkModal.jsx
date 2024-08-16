import React, { useEffect, useState } from 'react';
import './network.css';
import { MdPersonAddAlt } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import AddUserModal from './AddUserModal';
import UserListItem from './UserListItem';
import { userSearch } from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const NetworkModal = ({chats}) => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(state => state.userSearch);

  useEffect(() => {
    const timeOutId=setTimeout(()=>{
      dispatch(userSearch(searchTerm));
    },1000)
  }, [searchTerm, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenAddUserModal = () => {
    setIsAddUserModalOpen(true);
  };

  const handleCloseAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const handleInviteUser = (userData) => {
    console.log('User invited:', userData);
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="modal-dialog modal-dialog-left" id="Network">
      <div className="modal-content">
        <div className="modal-body">
          <div>
            <div className='d-flex justify-content-between'>
              <p className='fs-5 fw-bold'>Network</p>
              <button className='btn'
                onClick={handleOpenAddUserModal}
                data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Contact"
              >
                <MdPersonAddAlt className="fs-3" />
              </button>
            </div>
            <div className='input-search d-flex align-items-center'>
              <CiSearch className="fs-5 me-2" />
              <input
                type="text"
                placeholder='Search users...'
                className='w-100'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className='mt-4 searchlist overflow-y-auto h-100'>
            {loading && <p>Loading...</p>}
            {error && <p className='text-danger'>Error: {error}</p>}
            {!loading && !error && users && users.length === 0 && <p>No users found.</p>}
            {users && users.map(user => (
              <UserListItem key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
      {isAddUserModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" id='addModal'>
          <AddUserModal onClose={handleCloseAddUserModal} onInvite={handleInviteUser} />
        </div>
      )}
    </div>
  );
};

export default NetworkModal;
