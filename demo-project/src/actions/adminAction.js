import axios from 'axios';
import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  ALL_CHATS_REQUEST,
  ALL_CHATS_SUCCESS,
  ALL_CHATS_FAIL,
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  ALL_MESSAGES_REQUEST,
  ALL_MESSAGES_SUCCESS,
  ALL_MESSAGES_FAIL,
  CLEAR_ERRORS,
} from '../constant/adminConstant';

// Admin Login Action
export const adminLogin = (secretKey) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    const config = {
    withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('admin/login', { secretKey }, config);

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const fetchAdminAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
  
      const { data } = await axios.get('/admin/users'); // Assuming your route is `/admin/users`
  
      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: data.data, // Adjust according to your API response structure
      });
    } catch (error) {
      dispatch({
        type: ALL_USERS_FAIL,
        payload: error.response?.data.message || 'An error occurred',
      });
    }
  };

  export const fetchAdminAllChats = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_CHATS_REQUEST });
  
      const { data } = await axios.get('/admin/chats'); // Adjust the URL according to your API route
  
      dispatch({
        type: ALL_CHATS_SUCCESS,
        payload: data.transformeChats, // Adjust according to your API response structure
      });
    } catch (error) {
      dispatch({
        type: ALL_CHATS_FAIL,
        payload: error.response?.data.message || 'An error occurred',
      });
    }
  };

  export const fetchAdninAllPosts = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_POSTS_REQUEST });
  
      const { data } = await axios.get('/admin/posts'); // Adjust the URL according to your API route
  
      dispatch({
        type: ALL_POSTS_SUCCESS,
        payload: data.posts, // Adjust according to your API response structure
      });
    } catch (error) {
      dispatch({
        type: ALL_POSTS_FAIL,
        payload: error.response?.data.message || 'An error occurred',
      });
    }
  };

export const fetchAdminAllMessages = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_MESSAGES_REQUEST });
  
      const { data } = await axios.get('/admin/messages'); // Adjust the URL according to your API route
  
      dispatch({
        type: ALL_MESSAGES_SUCCESS,
        payload: data.transformeMessage, // Adjust according to your API response structure
      });
    } catch (error) {
      dispatch({
        type: ALL_MESSAGES_FAIL,
        payload: error.response?.data.message || 'An error occurred',
      });
    }
  };
// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

