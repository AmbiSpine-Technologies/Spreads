import React, { useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import "./comment.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, addReply, getPostDetails, deleteComment, resetDeleteComment, clearErrors } from "../../actions/postAction"; 
import { NavLink, useParams } from "react-router-dom";
import { followOrUnfollowUser } from "../../actions/userActions";
import CreateComment from "../Post/Comment/CreateComent";
import {toast } from 'react-toastify';
import { dislikeComment, dislikeReply, likeComment, likeReply } from "../../actions/commentAction";

const CommentsComponent = () => {
  const { id: postId } = useParams();
  const dispatch = useDispatch();

  const { post } = useSelector((state) => state.postDetail);
  const { loading, comments, error } = useSelector((state) => state.postComments); 
  const { success: deleteSuccess, error: deleteError } = useSelector((state) => state.commentDelete);
  const currentUser = useSelector((state) => state.user.user);
  const currentUserId = currentUser?._id;
  const [isFollowing, setIsFollowing] = useState(currentUser?.following.includes(post?.postedBy?._id));
  const [replyId, setReplyId] = useState(null);
  
  useEffect(() => {
    dispatch(getAllComments(postId));
    dispatch(getPostDetails(postId));

    if (deleteSuccess) {
      toast.success("Comment deleted successfully!");
      dispatch(resetDeleteComment());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
  }, [dispatch, postId, deleteSuccess, deleteError]);
  const handleAddReply = (parentId, replyText) => {
    dispatch(addReply(postId, parentId, replyText));
  };


  const handleUpdateLikes = (commentId, type) => {
    if (type === "like") {
      dispatch(likeComment(postId, commentId))
      .then(() => {
        toast.success("Comment liked successfully!");
      });
    } else if (type === "dislike") {
      dispatch(dislikeComment(postId, commentId))
      .then(() => {
        toast.success("Comment disliked successfully!");
      });
    }
  };

  // const handleUpdateLikes = (commentId, replyId, type) => {
  //   if (replyId) {
  //     // Handle like/dislike for replies
  //     if (type === "like") {
  //       dispatch(likeReply(postId, commentId, replyId))
  //         .then(() => {
  //           toast.success("Reply liked successfully!");
  //         })
  //         .catch((error) => {
  //           toast.error(`Failed to like reply: ${error.message}`);
  //         });
  //     } else if (type === "dislike") {
  //       dispatch(dislikeReply(postId, commentId, replyId))
  //         .then(() => {
  //           toast.success("Reply disliked successfully!");
  //         })
  //         .catch((error) => {
  //           toast.error(`Failed to dislike reply: ${error.message}`);
  //         });
  //     }
  //   } else {
  //     // Handle like/dislike for comments
  //     if (type === "like") {
  //       dispatch(likeComment(postId, commentId))
  //         .then(() => {
  //           toast.success("Comment liked successfully!");
  //         })
  //         .catch((error) => {
  //           toast.error(`Failed to like comment: ${error.message}`);
  //         });
  //     } else if (type === "dislike") {
  //       dispatch(dislikeComment(postId, commentId))
  //         .then(() => {
  //           toast.success("Comment disliked successfully!");
  //         })
  //         .catch((error) => {
  //           toast.error(`Failed to dislike comment: ${error.message}`);
  //         });
  //     }
  //   }
  // };
  

  const handleDeleteComment = (commentId,replyId = null) => {
    dispatch(deleteComment(postId, commentId, replyId));
  };

  const followOrUnfollowHandler = async () => {
    await dispatch(followOrUnfollowUser(post?.postedBy?._id, isFollowing, currentUserId));
    setIsFollowing(!isFollowing);
  };

  return (
    <div className='container-fluid'>
    <div className="container p-4" style={{ width: "1000px", background: "#D9E4E9", height: "100vh" }}>
    <div className='row'>
      <div className='col-5 border border-1 rounded-0 p-2' style={{ width: "400px", height: "80vh" }}>
        {post?.images && post.images.length > 0 && (
          <img src={post.images[0].url} alt="Content" width="100%" height="100%" />
        )}
        {post?.content && <p className='mt-2 text-muted' style={{ fontSize: "0.8rem", fontFamily: "cursive" }}>{post.content}</p>}
      </div>
      <div className='col-6 ps-4 '>
        <div className='user-container d-flex justify-content-between p-1'>
          <img src={post?.author?.avatar || post?.postedBy?.avatar} alt="Author" width="60" height="60" className='img-fluid rounded-circle' />
          <div>
            <h5>{post?.author?.name || post?.postedBy?.name || 'Unknown Author'}</h5>
            <p className='text-muted'>{post?.author?.email || post?.postedBy?.email || 'Unknown Email'}</p>
          </div>
          <div>
            {currentUserId === post?.postedBy?._id ? (
              <NavLink to="/me/update" className="btn-dark rounded-5 btn btn-sm">Edit Profile</NavLink>
            ) : (
              <button 
                onClick={followOrUnfollowHandler}
                className={`btn rounded-5 px-2 btn-sm ${!isFollowing ? 'btn-outline-danger' : 'btn-outline-primary'}`}
                disabled={loading}
              >
                {!isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
        <div className='mt-3'>
          <CreateComment postId={postId} />
        </div>
        <div className="mt-2 comment-container">
          <h5 className="mb-4">Comment Section</h5>
          {loading ? (
            <p>Loading comments...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <CommentsList
              comments={comments}
              addReply={handleAddReply}
              updateLikes={handleUpdateLikes}
              deleteComment={handleDeleteComment}
            />
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default CommentsComponent;
