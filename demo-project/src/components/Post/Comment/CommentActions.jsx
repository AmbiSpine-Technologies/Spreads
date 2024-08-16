import React, { useRef, useState } from 'react';
import { IoIosMore } from "react-icons/io";
import { useOutsideClick } from '../../../utlis/useOutsideClick'; 
import { RiDeleteBin7Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { CiSaveDown2 } from "react-icons/ci";


const CommentActions = ({ handleDelete, onRemove, onSave }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  
  useOutsideClick(dropdownRef, () => setDropdownVisible(false));

  const handleToggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  

  return (
    <div className="commment-more" ref={dropdownRef}>
      <IoIosMore className="fs-6" onClick={handleToggleDropdown} />
      {isDropdownVisible && (
        <div className="card p-2 bg-white comment-actions" style={{width:"200px"}}>
          <button type='submit' onClick={handleDelete} className="dropdown-item p-2 mt-1">
            <RiDeleteBin7Line className='fs-6 me-1'/> Delete Comment
        </button>
          <button onClick={onRemove} className="dropdown-item p-2 mt-1"><CiEdit className='fs-6 me-1'/>Edit Comment</button>
          <button onClick={onSave} className="dropdown-item p-2 mt-1"><CiSaveDown2 className='fs-6 me-1'/> Save</button>
        </div>
      )}
    </div>
  );
};

export default CommentActions;

