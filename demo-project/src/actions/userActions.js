import {
    CLEAR_ERRORS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    ALL_FOLLOWING_USERS_SUCCESS,
    ALL_FOLLOWING_USERS_REQUEST,
    ALL_FOLLOWING_USERS_FAIL,
    ALL_FOLLOW_USERS_REQUEST,
    ALL_FOLLOW_USERS_SUCCESS,
    ALL_FOLLOW_USERS_FAIL,
    FOLLOWING_UPDATE, 
    FOLLOWING_UPDATE_SUCCESS, 
    FOLLOWING_UPDATE_FAIL,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAIL,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAIL,
    BOOKMARK_POST_FAIL,
    BOOKMARK_POST_SUCCESS,
    BOOKMARK_POST_REQUEST,
    BOOKMARK_POST_RESET,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    USER_SEARCH_REQUEST,
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAILURE,
    FETCH_MY_FRIENDS_REQUEST,
    FETCH_MY_FRIENDS_SUCCESS,
    FETCH_MY_FRIENDS_FAILURE
} from "../constant/userConstant";
import { toast } from 'react-toastify';

import axios from "axios";
import axiosInstance from "../utlis/axios.js"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`/api/user/login`,
             { email, password }, config);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload:data.user,
            // payload: {
            //     token: data.token,
            //     success: data.user
            // }
        });
        localStorage.setItem('token', data.token); 
        // localStorage.setItem("token", data.token); 
        // localStorage.setItem("user", JSON.stringify(data.user));
        // localStorage.setItem("login", true);
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response?.data?.message || "An error occurred"
        });
    }
};

export const register = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        // console.log("Sending registration request with data:", formData);

        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };

        const { data } = await axios.post(`/api/user/register`, formData, config);

        dispatch({ type: REGISTER_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response?.data?.message || "An error occurred"
        });
    }
};

// Change Password
export const changePassword = (passwords) => async (dispatch) => {
    try {
      dispatch({ type: CHANGE_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const { data } = await axiosInstance.post('/user/changepwd', passwords, config);
  
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: data.message
      });
    } catch (error) {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: error.response.data.message
      });
    }
  };
  
// Get all users
export const getAllUsers = (id) => async (dispatch) => {
    
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axiosInstance.get(`/user/other/${id}`);
        dispatch({ type: ALL_USERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response?.data?.message || 'An error occurred while fetching users.',
        });
    }
};

export const loadUser = ()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST});

        const {data} = await axios.get(`/api/user/me`);
        dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
    }catch(error){
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data.message})
    }
}

// Get user details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`http://localhost:8000/api/user/${id}`, config);

        console.log('details', data.user);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
}


export const logout=()=>async (dispatch)=>{
    try{
        await axios.get(`/api/user/logout`);

        dispatch({type:LOGOUT_SUCCESS})
    }catch(error){
        dispatch({type:LOGOUT_FAIL,payload:error.response.data.message})
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put(`/api/user/update/me`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response?.data?.message || 'An error occurred',
        });
    }
};

export const searchUser = (query) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.get(`http://localhost:8000/api/user/search?username=${query}`, config);

        dispatch({
            type: SEARCH_USER_SUCCESS,
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: SEARCH_USER_FAIL,
            payload: error.response?.data?.message || "An error occurred",
        });
    }
};

export const updateUserProfile = (id,userData) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(`http://localhost:8000/api/user/update/${id}`, 
            userData,
             config
        );

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};



  export const getAllFollowedUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_FOLLOW_USERS_REQUEST });
  
      const { data } = await axiosInstance.get('/user/followed/all');
  
      dispatch({
        type: ALL_FOLLOW_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_FOLLOW_USERS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const getAllFollowingUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_FOLLOWING_USERS_REQUEST });
  
      const { data } = await axiosInstance.get('/user/following/all');
  
      dispatch({
        type: ALL_FOLLOWING_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_FOLLOWING_USERS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };



  export const followOrUnfollowUser = (userId, isFollowing, currentUserId) => async (dispatch) => {
    try {
      if (isFollowing) {
        // Unfollow
        dispatch({ type: UNFOLLOW_USER_REQUEST });
        const { data } = await axiosInstance.post(`/user/unfollow/${userId}`, { id: currentUserId }, { withCredentials: true });
        dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: data });
        dispatch({ type: FOLLOWING_UPDATE, payload: userId });
        toast.success(data.message);
      } else {
        // Follow
        dispatch({ type: FOLLOW_USER_REQUEST });
        const { data } = await axiosInstance.post(`/user/follow/${userId}`, { id: currentUserId }, { withCredentials: true });
        dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
        dispatch({ type: FOLLOWING_UPDATE, payload: userId });
        toast.success(data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      if (isFollowing) {
        dispatch({ type: UNFOLLOW_USER_FAIL, payload: errorMessage });
      } else {
        dispatch({ type: FOLLOW_USER_FAIL, payload: errorMessage });
      }
    }
  };

export const bookmarkPost = (postId,currentUserId) => async (dispatch) => {
    try {
        dispatch({ type: BOOKMARK_POST_REQUEST });

        const { data } = await axiosInstance.put(`/user/bookmarks/${postId}`,{ id: currentUserId });

        dispatch({
            type: BOOKMARK_POST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BOOKMARK_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const userSearch = (firstName = "") => async (dispatch) => {
    dispatch({type: USER_SEARCH_REQUEST,});
    try {
        const { data } = await axiosInstance.get(`/user/chat/search?firstName=${firstName}`);
        dispatch({
            type: USER_SEARCH_SUCCESS,
            payload: data.users,
        });
    } catch (error) {
        dispatch({
            type: USER_SEARCH_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
export const resetBookmarkPost = () => (dispatch) => {
    dispatch({ type: BOOKMARK_POST_RESET });
};



export const fetchMyFriends = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MY_FRIENDS_REQUEST });

    // Construct the URL based on whether chatId is provided
    let url = '/chat/friend';
    if (chatId) {
      url += `?chatId=${chatId}`;
    }

    const response = await axiosInstance.get(url);
    const { friends } = response.data;

    dispatch({
      type: FETCH_MY_FRIENDS_SUCCESS,
      payload: friends
    });
  } catch (error) {
    dispatch({
      type: FETCH_MY_FRIENDS_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

  

