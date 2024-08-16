import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import "./groupModal.css"
import { fetchMyGroups } from '../../../../actions/chatAction';
import { fetchMyFriends } from '../../../../actions/userActions';
import { useParams } from 'react-router-dom';

const GroupModalComponent = ({chats}) => {
  const dispatch = useDispatch();
  // const { groups, loading, error } = useSelector(state => state.message);
  // { friends, loading, error } = useSelector(state => state.friends);
console.log(chats._id)
const { id: chatId } = useParams();
console.log(chatId)
  useEffect(() => {
    dispatch(fetchMyFriends());
    dispatch(fetchMyGroups());
  }, [dispatch, ]);


  return (
    <div className="modal-dialog modal-dialog-centered" style={{width:"600px"}}>
      <div className="modal-content">
        <div className="modal-body p-3">
        <div className='gform'>
        <form className='border border-1 rounded-2 justify-content-between w-100 align-items-center d-flex p-2'>
              <span className='to'>TO: </span>
              <input type="text" className='w-100 border-0  form-control' placeholder='Aditya Shivastava' />
              <IoIosSearch className='fs-4 me-2 text-primary' />
            </form>
          </div>
            
          <div className=' mt-1 ms-4 '>
               <p className='fs-5'> 
                <span className='border border-2 border-secondary rounded-3 text-primary pb-1 px-2'><HiUserGroup />
                </span> Create new Group</p>
            </div>
           
            <div className='d-flex flex-wrap gap-1 mx-2'>
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className='d-flex align-items-center border border-1 border-secondary p-1 rounded-5'>
                  <img src='https://wallpapercave.com/wp/wp4454176.jpg' width='30' height='30' className='rounded-circle' alt='avatar' />
                  <h6 className='ms-1  mt-1' style={{fontSize: "14px"}}>
                    Aditya Shiv <MdVerified className='text-primary' /> <RxCross2 className='' />
                  </h6>
                </div>
              ))}
          </div>
        </div>
        <div className="modal-footer border-0 border-top-0">
            <button type="button" className="btn btn-primary border-0 btn-sm" data-bs-dismiss="modal">Next</button>
          </div>
      </div>
    </div>
  )
}

export default GroupModalComponent