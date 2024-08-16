import {
    NEW_POST_REQUEST,
    NEW_POST_FAIL,
    NEW_POST_SUCCESS,
    NEW_POST_RESET,
    ALL_POST_REQUEST,
    ALL_POST_SUCCESS,
    ALL_POST_FAIL,
    CLEAR_ERRORS,
    NEW_COMMENT_REQUEST,
    NEW_COMMENT_SUCCESS,
    NEW_COMMENT_FAIL,
    NEW_COMMENT_RESET,
    ALL_COMMENT_REQUEST,
    ALL_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    ALL_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_RESET,
    DELETE_POST_REQUEST,
    UPDATE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    UPDATE_POST_SUCCESS,
    DELETE_POST_FAIL,
    UPDATE_POST_FAIL,
    DELETE_POST_RESET,
    UPDATE_POST_RESET,
    POST_DETAILS_FAIL,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_REQUEST,
    UNLIK_POST_REQUEST,
    UNLIK_POST_SUCCESS,
    UNLIK_POST_FAIL,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    NOT_INTERESTED_SUCCESS,
    NOT_INTERESTED_FAIL,
    REFRESH_PAGE,
    ADD_REPLY_SUCCESS,
    ADD_REPLY_FAIL,
    ADD_REPLY_REQUEST
  } from "../constant/postConstant";

export const postsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_POST_REQUEST:
        return {
          loading: true,
          POSTs: [],
        };
      case ALL_POST_SUCCESS:
        return {
          loading: false,
          posts: action.payload.posts,
        };
      case ALL_POST_FAIL:
        return {
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



  const initialState = {
    post: {},
    loading: false,
    success: false,
    error: null,
    refresh: false,
   
  };

  
  export const newPostReducer = (state = initialState, action) => {
    switch (action.type) {
      case NEW_POST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_POST_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          post: action.payload.post,
        };
      case NEW_POST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_POST_RESET:
        return {
          ...state,
          success: false,
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

  export const postReducer = (state={},action)=>{
    switch(action.type){
      case DELETE_POST_REQUEST:
      case UPDATE_POST_REQUEST:
        return{
          ...state,
          loading:true
        }
      case DELETE_POST_SUCCESS:
        return{
          ...state,
          loading:false,
          isDeleted:action.payload,
        }
      case UPDATE_POST_SUCCESS:
        return{
          ...state,
          loading:false,
          iisUpdate:action.payload,
        };
      case DELETE_POST_FAIL:
      case UPDATE_POST_FAIL:
        return{
          ...state,
          loading:false,
          error:action.payload
        }
      case DELETE_POST_RESET:
        return{
          ...state,
          isDeleted:false,
        };
      case UPDATE_POST_RESET:
        return{
          ...state,
          iisUpdate:false
        }
      case CLEAR_ERRORS:
        return{
          ...state,
          error:null
        };
      default:
        return state;
    }
  };

  export const postDetailsReducer = (state = { post: {} }, action) => {
    switch (action.type) {
      case POST_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case POST_DETAILS_SUCCESS:
        return {
          loading: false,
          post: action.payload,
        };
      case POST_DETAILS_FAIL:
        return {
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

  export const newCommentReducer = (state = { post: {} }, action) => {
    switch (action.type) {
      case NEW_COMMENT_REQUEST:
      case ADD_REPLY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_COMMENT_SUCCESS:
      case ADD_REPLY_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          post: action.payload.post,
        };
      case NEW_COMMENT_FAIL:
      case ADD_REPLY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_COMMENT_RESET:
        return {
          ...state,
          success: false,
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

  
 export const postCommentReducer = (state = { comments: []}, action) => {
    switch (action.type) {
      case ALL_COMMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ALL_COMMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: action.payload,
        };
      case ALL_COMMENT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const refreshReducer = (state = initialState, action) => {
    switch (action.type) {
      case REFRESH_PAGE:
        return {
          ...state,
          refresh: !state.refresh,
        };
      default:
        return state;
    }
  };
 
  
  export const commentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_COMMENT_REQUEST:
        return { loading: true };
      case DELETE_COMMENT_SUCCESS:
        return { loading: false, success: true, message: action.payload, isDeleted: true };
      case DELETE_COMMENT_FAIL:
        return { loading: false, error: action.payload };
      case DELETE_COMMENT_RESET:
        return {
          ...state,
          isDeleted: false,
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
  
  export const commentReducer=(state={},action)=>{
    switch(action.type){
      case  DELETE_COMMENT_REQUEST:
        return{
          ...state,
          loading:true,
        }
      case DELETE_COMMENT_SUCCESS:
        return{
          loading:false,
          isDeleted:action.payload
        };
      case DELETE_COMMENT_FAIL:
        return{
          ...state,
          loading:false,
          error:action.payload
        }
      case DELETE_COMMENT_RESET:
        return{
          ...state,
          isDeleted:false,
        }
      case CLEAR_ERRORS:
        return{
          ...state,
          error:null
        }
      default:
        return state;
    }
  };


  export const postLikeReducer = (state =  { posts: []}, action) => {

      switch (action.type) {
        case LIKE_POST_REQUEST:
        case UNLIK_POST_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case LIKE_POST_SUCCESS:
          return {
            ...state,
            loading: false,
            posts: state.posts.map(post =>
              post._id === action.payload._id ? action.payload : post
            ),
            error: null,
          };
        case UNLIK_POST_SUCCESS:
          return {
            ...state,
            loading: false,
            posts: state.posts.map(post =>
              post._id === action.payload._id ? action.payload : post
            ),
            error: null,
          };
        case LIKE_POST_FAIL:
        case UNLIK_POST_FAIL:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case REFRESH_PAGE:
            return {
              ...state,
              posts: [],
              loading: false,
              error: null,
            };
        default:
          return state;
      }
    
  };

  export const InterestedPostsReducer = (state = {notInterestedPosts:[]}, action) => {
    switch (action.type) {
      case NOT_INTERESTED_SUCCESS:
        return {
          ...state,
          notInterestedPosts: [...state.notInterestedPosts, action.payload],
          error: null,
        };
      case NOT_INTERESTED_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  