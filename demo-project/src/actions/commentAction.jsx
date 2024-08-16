import axiosInstance from "../utlis/axios.js"; 
import {
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  DISLIKE_COMMENT_REQUEST,
  DISLIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT_FAILURE,
  LIKE_REPLY_REQUEST,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_FAILURE,
  DISLIKE_REPLY_REQUEST,
  DISLIKE_REPLY_SUCCESS,
  DISLIKE_REPLY_FAILURE
} from '../constant/commentConstant';
import { FETCH_NOTIFICATIONS_FAILURE, FETCH_NOTIFICATIONS_REQUEST, FETCH_NOTIFICATIONS_SUCCESS } from "../constant/chatConstant.js";

// Like comment action
export const likeComment = (postId, commentId) => async (dispatch) => {
  dispatch({ type: LIKE_COMMENT_REQUEST });

  try {
    const response = await axiosInstance.post(`/comments/posts/${postId}/comments/${commentId}/like`);
    dispatch({ type: LIKE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LIKE_COMMENT_FAILURE, payload: error.message });
  }
};

// Dislike comment action
export const dislikeComment = (postId, commentId) => async (dispatch) => {
  dispatch({ type: DISLIKE_COMMENT_REQUEST });

  try {
    const response = await axiosInstance.post(`/comments/posts/${postId}/comments/${commentId}/dislike`);
    dispatch({ type: DISLIKE_COMMENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DISLIKE_COMMENT_FAILURE, payload: error.message });
  }
};

// Like reply action
export const likeReply = (postId, commentId, replyId) => async (dispatch) => {
  dispatch({ type: LIKE_REPLY_REQUEST });

  try {
    const response = await axiosInstance.post(`/comments/posts/${postId}/comments/${commentId}/replies/${replyId}/like`);
    dispatch({ type: LIKE_REPLY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LIKE_REPLY_FAILURE, payload: error.message });
  }
};

// Dislike reply action
export const dislikeReply = (postId, commentId, replyId) => async (dispatch) => {
  dispatch({ type: DISLIKE_REPLY_REQUEST });

  try {
    const response = await axiosInstance.post(`/comments/posts/${postId}/comments/${commentId}/replies/${replyId}/dislike`);
    dispatch({ type: DISLIKE_REPLY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DISLIKE_REPLY_FAILURE, payload: error.message });
  }
};


export const fetchNotifications = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });
    
    const { data } = await axiosInstance.get('user/chat/notification');
    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: data.allRequests,
    });
    
  } catch (error) {
    dispatch({
      type: FETCH_NOTIFICATIONS_FAILURE,
      payload: error.response.data.message,
    });
  }
};
