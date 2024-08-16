import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiShareAlt, BiBlock, BiTrash } from 'react-icons/bi';
import { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from '../../../utlis/useOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import { sendFriendRequest, clearErrors } from '../../../actions/chatAction';
import { toast } from 'react-toastify';

const UserListItem = ({ user }) => {
  const colonRef = useRef(null);
  const [isColon, setIsColon] = useState(false);
  const userId = user?._id;

  useOutsideClick(colonRef, () => setIsColon(false));

  const handleColon = () => {
    setIsColon((prev) => !prev);
  };

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(state => state.request);

  const handleSendRequest = () => {
    if (userId) {
      dispatch(sendFriendRequest(userId));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <div className='d-flex justify-content-between align-items-center mb-2'>
      <div className='d-flex align-items-center'>
        <img 
          src={user.avatar} 
          alt={`${user.firstName} ${user.lastName}`} 
          className='rounded-circle' 
          style={{ width: '30px', height: '30px', marginRight: '10px' }} 
        />
        <p className='mb-0'>{user.firstName} {user.lastName}</p>
      </div>
      <div className='position-relative' ref={colonRef}>
        <button 
          className='btn outline-none border-0'
          onClick={handleColon}
          type='button'>
          <BsThreeDotsVertical />
        </button>
        {isColon && (
          <ul className='custom-dropdown position-absolute bg-white shadow-sm p-2' style={{ right: 0, zIndex: 1000 }}>
            <li className='d-flex justify-content-between'>
              <span>Share</span>
              <BiShareAlt />
            </li>
            <li className='d-flex justify-content-between' style={{cursor:"pointer"}} onClick={handleSendRequest}>
              <span>Add</span>
              <BiBlock />
            </li>
            <li className='d-flex justify-content-between'>
              <span>Remove</span>
              <BiTrash />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
