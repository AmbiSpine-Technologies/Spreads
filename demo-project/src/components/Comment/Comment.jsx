import {
  FaPlusCircle,
  FaMinusCircle,
  FaThumbsUp,
  FaThumbsDown,
  FaReply,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import "./comment.css";
import TimeAgo from 'react-timeago';
import React, { useState } from "react";

const Comment = ({ comment, addReply, updateLikes, deleteComment }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showChildren, setShowChildren] = useState(true);

  const handleReply = () => {
    addReply(comment._id, replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-info">
          <img src={comment.avatar} alt="avatar" className="avatar" />
          <span className='text-small fw-bold username'>{comment.name}</span> 
          <span className="timestamp text-small">
          <TimeAgo date={comment.createdAt} />
          </span>
        </div>
        <div className="comment-actions-header">
          {(comment.replies && comment.replies.length > 0) && ( 
            <span
              className="toggle-children"
              onClick={() => setShowChildren(!showChildren)}
            >
              {showChildren ? <FaMinusCircle /> : <FaPlusCircle />}
            </span>
          )}
          <span
            className="delete-comment"
            onClick={() => deleteComment(comment._id)}
          >
            <FaTrash className="delete-icon" />
          </span>
        </div>
      </div>
      <div className="comment-body">
        <p className='text-muted ps-4' style={{fontSize:"0.9rem",fontFamily:"cursive"}}>
          {comment.comment || comment.reply}</p> 
      </div>
      <div className="comment-actions align-items-center ">
      <span onClick={() => updateLikes(comment._id, "like")}>
          <FaThumbsUp /> {comment.likes?.length || 0} 
        </span>
        <span onClick={() => updateLikes(comment._id, "dislike")}>
          <FaThumbsDown /> {comment.dislikes?.length || 0} 
        </span>
        <span onClick={() => setShowReply(!showReply)}>
          <FaReply /> Reply
        </span>
        <span>
          <FaShare /> Share
        </span>
      </div>
      {showReply && (
        <div className="reply-section">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Enter your reply..."
            rows="3"
            cols="50"
          />
          <button onClick={handleReply}>Submit</button>
        </div>
      )}
      {showChildren && comment?.replies && comment?.replies?.length > 0 && ( 
        <div className="comment-children">
          {comment.replies.map((child) => (
            <Comment
              key={child._id}
              comment={child}
              addReply={addReply}
              updateLikes={updateLikes}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
