import { CLEAR_ERRORS, FETCH_NOTIFICATIONS_FAILURE, FETCH_NOTIFICATIONS_REQUEST, FETCH_NOTIFICATIONS_SUCCESS } from '../constant/chatConstant';
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
  
  const initialState = {
    loading: false,
    error: null,
    comments: [], 
    replies: []  
  };
  
  export const commentsLikeReducer = (state = initialState, action) => {
    switch (action.type) {
    
      case LIKE_COMMENT_REQUEST:
      case DISLIKE_COMMENT_REQUEST:
      case LIKE_REPLY_REQUEST:
      case DISLIKE_REPLY_REQUEST:
        return { ...state, loading: true, error: null };
  
   
      case LIKE_COMMENT_SUCCESS:
      case DISLIKE_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.map(comment =>
            comment._id === action.payload.comment._id ? action.payload.comment : comment
          )
        };
  
     
      case LIKE_REPLY_SUCCESS:
      case DISLIKE_REPLY_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.map(comment => ({
            ...comment,
            replies: comment.replies.map(reply =>
              reply._id === action.payload.reply._id ? action.payload.reply : reply
            )
          }))
        };
  
     
      case LIKE_COMMENT_FAILURE:
      case DISLIKE_COMMENT_FAILURE:
      case LIKE_REPLY_FAILURE:
      case DISLIKE_REPLY_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

export const notificationReducer = (state = { notifications: [],}, action) => {
    switch (action.type) {
      case FETCH_NOTIFICATIONS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          notifications: action.payload,
        };
      case FETCH_NOTIFICATIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  

