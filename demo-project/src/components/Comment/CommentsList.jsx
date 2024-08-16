// ------------------------------------
import React from "react";
import Comment from "./Comment";

const CommentsList = ({ comments, addReply, updateLikes, deleteComment }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
          updateLikes={updateLikes}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default CommentsList;
