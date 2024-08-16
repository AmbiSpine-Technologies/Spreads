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



// src/reducers/adminReducer.js



const initialState = {
  users: [],
  chats: [],
  posts: [],
  dmin: {},
  isAdmin: false,
  messages: [],
  loading: false,
  error: null,
};

export const adminAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
    case ALL_CHATS_REQUEST:
    case ALL_POSTS_REQUEST:
    case ALL_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ALL_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload,
      };

    case ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };

    case ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };

    case ALL_USERS_FAIL:
    case ALL_CHATS_FAIL:
    case ALL_POSTS_FAIL:
    case ALL_MESSAGES_FAIL:
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



export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isAdmin: false,
      };

    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdmin: true,
        admin: action.payload,
      };

    case ADMIN_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAdmin: false,
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
