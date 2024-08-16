import axios from "axios";
import axiosInstance from "../utlis/axios.js";
import { toast } from 'react-toastify';
import {
    NEW_POST_REQUEST,
    NEW_POST_FAIL,
    NEW_POST_SUCCESS,
    CLEAR_ERRORS,
    ALL_POST_REQUEST,
    ALL_POST_SUCCESS,
    ALL_POST_FAIL,
    ALL_COMMENT_SUCCESS,
    ALL_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_RESET,
    NEW_COMMENT_REQUEST,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_FAIL,
    NEW_COMMENT_RESET,
    ALL_COMMENT_REQUEST,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    POST_DETAILS_FAIL,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_REQUEST,
    UNLIK_POST_REQUEST,
    UNLIK_POST_SUCCESS,
    UNLIK_POST_FAIL,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    NOT_INTERESTED_FAIL,
    NOT_INTERESTED_SUCCESS,
    REFRESH_PAGE,
    ADD_REPLY_REQUEST,
    ADD_REPLY_SUCCESS,
    ADD_REPLY_FAIL
} from "../constant/postConstant";

// Fetch all posts
export const ALLGetPosts = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_POST_REQUEST });

        const { data } = await axiosInstance.get(`/posts/all/${id}`);

       
        dispatch({
            type: ALL_POST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_POST_FAIL,
            payload: error.response?.data?.message
        });
    }
};
// Create a new post
export const createPost = (formData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_POST_REQUEST });
    console.log(formData)
    //'Content-Type': 'application/json',
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axiosInstance.post('/posts/create', formData, config);

    dispatch({
      type: NEW_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
    dispatch({
      type: NEW_POST_FAIL,
      payload: errorMessage,
    });
  }
};

export const getPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    
    const { data } = await axios.get(`http://localhost:8000/api/posts/${id}`);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
   
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


  
export const updatePost=(id,postData)=>async (dispatch)=>{
    try{
      dispatch({type:UPDATE_POST_REQUEST});
  
      const config = {
        headers:{"Content-Type":"application/json"},
      };
  
      const {data}=await axios.put(`http://localhost:8000/api/posts/${id}`,
      postData,
      config
      );
  
      dispatch({
        type:UPDATE_POST_SUCCESS,
        payload:data.success,
      });
    }catch(error){
      dispatch({
        type:UPDATE_POST_FAIL,
        payload:error.message.data.message
      })
    }
  };

  export const deletePost = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_POST_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
  
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };


export const newComment = (CommentData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COMMENT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json', 
      },
    };

    const { data } = await axiosInstance.post('/posts/comment', CommentData, config);

    dispatch({
      type: NEW_COMMENT_SUCCESS,
      payload: data, 
    });
  } catch (error) {
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload: error.response?.data?.message || 'An error occurred', // Safe access to error message
    });
  }
};


//Get All Comments Of Product
export const getAllComments = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COMMENT_REQUEST });

    const { data } = await axios.get(`http://localhost:8000/api/posts/comment/all`, {
      params: { id },
    });

    console.log(data)

    dispatch({
      type: ALL_COMMENT_SUCCESS,
        payload: data.comments,
    });
  } catch (error) {
    dispatch({
      type: ALL_COMMENT_FAIL,
      payload: error.response?.data?.message || 'An error occurred', // Safe access to error message
    });
  }
};

export const addReply = (postId, commentId, reply) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_REPLY_REQUEST });

    

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axiosInstance.post(`/posts/${postId}/comment/${commentId}/reply`, { reply }, config);

    dispatch({ type: ADD_REPLY_SUCCESS, payload: data });
    toast.success('Reply added successfully');
  } catch (error) {
    dispatch({
      type: ADD_REPLY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
    toast.error(error.response && error.response.data.message ? error.response.data.message : error.message);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_POST_REQUEST });

    const { data } = await axiosInstance.post(`/posts/like`, { postId });

    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Unlike a post
export const unlikePost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: UNLIK_POST_REQUEST });


    const { data } = await axiosInstance.post(`/posts/unlike`, { postId });

    dispatch({
      type: UNLIK_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNLIK_POST_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const markNotInterested = (postId) => async (dispatch) => {
  try {
    await axios.post(`/posts/not-interested/${postId}`);
    // Optionally handle success
    dispatch({
      type: 'NOT_INTERESTED_SUCCESS',
      payload: postId,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'NOT_INTERESTED_FAIL',
      payload: error.message,
    });
  }
};

export const deleteComment = (postId, commentId, replyId = null) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    const {
      user: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: {
        postId,
        commentId,
        replyId,
      },
    };

    const { data } = await axiosInstance.delete('/posts/comment/delete', config);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Reset Delete Comment
export const resetDeleteComment = () => (dispatch) => {
  dispatch({ type: DELETE_COMMENT_RESET });
};

export const toggleRefresh = () => {
  return {
    type: REFRESH_PAGE,
  };
};

// Clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({
      type: CLEAR_ERRORS,
  });
};

export const restLikePost = () => (dispatch) => {
  dispatch({ type: REFRESH_PAGE });
};