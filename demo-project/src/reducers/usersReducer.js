import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,

    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_USER_RESET,
    DELETE_USER_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
    FOLLOWING_REQUEST,
    FOLLOWING_SUCCESS,  
    ALL_FOLLOW_USERS_REQUEST,
    ALL_FOLLOW_USERS_SUCCESS,
    ALL_FOLLOW_USERS_FAIL,
    ALL_FOLLOWING_USERS_SUCCESS,
    ALL_FOLLOWING_USERS_REQUEST,
    ALL_FOLLOWING_USERS_FAIL,
    FOLLOWING_UPDATE, 
    FOLLOWING_UPDATE_SUCCESS, 
    FOLLOWING_UPDATE_FAIL, 
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAIL,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAIL,
    BOOKMARK_POST_SUCCESS,
    BOOKMARK_POST_FAIL,
    BOOKMARK_POST_REQUEST,
    BOOKMARK_POST_RESET,
    CHANGE_PASSWORD_FAIL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_REQUEST,
    USER_SEARCH_REQUEST,
    USER_SEARCH_SUCCESS,
    USER_SEARCH_FAILURE,
    FETCH_MY_FRIENDS_REQUEST,
    FETCH_MY_FRIENDS_SUCCESS,
    FETCH_MY_FRIENDS_FAILURE
} from "../constant/userConstant";

const initialState = {
    user: null,
    token: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    searchResults: [],
};

// export const userReducer = (state={user:{}},action)=>{
//     switch(action.type){
//         case LOGIN_REQUEST:
//         case REGISTER_REQUEST:
//         case LOAD_USER_REQUEST:
//         case SEARCH_USER_REQUEST:
//             return{
//                 loading:true,
//                 isAuthenticated:false,
//             }
//         case LOGIN_SUCCESS:
//         case REGISTER_SUCCESS:
//         case LOAD_USER_SUCCESS:
//             return{
//                 ...state,
//                 loading:false,
//                 isAuthenticated:true,
//                 user:action.payload
//             };
//         case LOGOUT_SUCCESS:
//             return{
//                 loading:false,
//                 user:null,
//                 isAuthenticated:false
//             }
//         case SEARCH_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 searchResults: action.payload,
//             };
//         case LOGIN_FAIL:
//         case REGISTER_FAIL:
//             return{
//                 ...state,
//                 loading:false,
//                 isAuthenticated:false,
//                 user:null,
//                 error:action.payload,
//             }
//         case LOAD_USER_FAIL:
//             return {
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 error: action.payload,
//             };
//         case LOGOUT_FAIL:
//         case SEARCH_USER_FAIL:
//             return{
//                 ...state,
//                 loading:false,
//                 error:action.payload,
//             }
//         case CLEAR_ERRORS:
//             return{
//                 ...state,
//                 error:null,
//             };
//         default:
//             return state;
//     }
// }


//     switch (action.type) {
//         case LOGIN_REQUEST:
//         case REGISTER_REQUEST:
//         case LOAD_USER_REQUEST:
//         case SEARCH_USER_REQUEST:
//             return {
//                 loading: true,
//                 isAuthenticated:true,
//             };
//         case LOGIN_SUCCESS:
//         case REGISTER_SUCCESS:
//         case LOAD_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: true,
//                 users: action.payload
//             };
//         case SEARCH_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 searchResults: action.payload,
//             };
//         case LOGOUT_SUCCESS:
//             return {
//                 loading: false,
//                 user: null,
//                 isAuthenticated: false,
//             };
//         case LOGIN_FAIL:
//         case REGISTER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated:false,
//                 user:null,
//                 error:action.payload,
//             };
//         case LOAD_USER_FAIL:
//             return {
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 error: action.payload,
//         };
//         case SEARCH_USER_FAIL:
//         case LOGOUT_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             };
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };
//         default:
//             return state;
//     }
// };


export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
    case SEARCH_USER_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
    case SEARCH_USER_FAIL:
    case CHANGE_PASSWORD_FAIL:
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

export const userSearchReducer = (state = { users: [],}, action) => {
  switch (action.type) {
      case USER_SEARCH_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          };
      case USER_SEARCH_SUCCESS:
          return {
              ...state,
              loading: false,
              users: action.payload,
          };
      case USER_SEARCH_FAILURE:
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

export const userDetailsReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading:false,
                error: null,
            };
        default:
            return state;
    }
};


export const getAllUserReducer = (state = { users: [],  friends: [],}, action) => {
    switch (action.type) {
      case ALL_USERS_REQUEST:
      case FOLLOWING_REQUEST:
      case FETCH_MY_FRIENDS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
          error: null
        };
      case FETCH_MY_FRIENDS_SUCCESS:
          return {
            ...state,
            loading: false,
            friends: action.payload
          };    
      case FOLLOWING_SUCCESS:
        return {
          ...state,
          loading: false,
          users: state.users.map(user =>
            user._id === action.payload._id ? action.payload : user
          ),
          error: null
        };

      case ALL_USERS_FAIL:
      case FETCH_MY_FRIENDS_FAILURE:

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

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
             };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return { 
                ...state,
                loading: false,
                isUpdate: action.payload,
             };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_USER_FAIL:
            return { 
                ...state,
                loading: false, 
                error: action.payload
             };
        case UPDATE_PROFILE_RESET:
        case UPDATE_USER_RESET:
            return{
                ...state,
                isUpdated:false,
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


  export const AllfollowedUsersReducer = (state = {followedUsers: [],}, action) => {
    switch (action.type) {
      case ALL_FOLLOW_USERS_REQUEST:
        case ALL_FOLLOWING_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_FOLLOW_USERS_SUCCESS:
        case ALL_FOLLOWING_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          followedUsers: action.payload,
        };
      case ALL_FOLLOW_USERS_FAIL:
        case ALL_FOLLOWING_USERS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  const initialStates = {
    user: {
      following: [],
    },
    loading: false,
    isFollowing: false,
    error: null,
  };
  
  export const userFollowingReducer = (state = initialStates, action) => {
    switch (action.type) {
      case FOLLOW_USER_REQUEST:
      case UNFOLLOW_USER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FOLLOW_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isFollowing: true,
        };
      case UNFOLLOW_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isFollowing: false,
        };
      case FOLLOW_USER_FAIL:
      case UNFOLLOW_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case FOLLOWING_UPDATE:
        const isFollowing = state.user.following.includes(action.payload);
        const updatedFollowing = isFollowing
          ? state.user.following.filter(userId => userId !== action.payload)
          : [...state.user.following, action.payload];
  
        return {
          ...state,
          loading: false,
          user: { ...state.user, following: updatedFollowing },
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  }

  export const bookmarkPostReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOKMARK_POST_REQUEST:
            return { loading: true };
        case BOOKMARK_POST_SUCCESS:
            return { loading: false, success: true, message: action.payload };
        case BOOKMARK_POST_FAIL:
            return { loading: false, error: action.payload };
        case BOOKMARK_POST_RESET:
            return {}; // 
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};