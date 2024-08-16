import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { newComment, clearErrors } from '../../../actions/postAction.js'; 
import { NEW_COMMENT_RESET } from '../../../constant/postConstant.js';

const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const { success, error,loading } = useSelector((state) => state.newComment);


  const submitCommentHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("comment", comment); 
    myForm.set("postId", postId);

    dispatch(newComment(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Something went wrong'); 
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Comment Submitted Successfully");
      dispatch({ type: NEW_COMMENT_RESET });
      setComment('');
    }

  }, [dispatch, success, error]);

  return (
    <div>
      <form className='mt-1 w-100 bg-white p-2 d-flex gap-1' onSubmit={submitCommentHandler}>
        <textarea
          rows={1}
          placeholder='Your Comment'
          className='b-1 p-1 rounded-0 w-100 text-normal'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-label='Comment'
        />
        <button
          type='submit'
          className='btn rounded-0 border-0 btn-dark'
          disabled={loading} 
          aria-busy={loading}
        >
          {loading ? 'Submitting...' : 'Comment'}
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
