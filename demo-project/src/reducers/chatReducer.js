// reducers/chatReducer.js

import {
    FETCH_CHATS_REQUEST,
    FETCH_CHATS_SUCCESS,
    FETCH_CHATS_FAILURE,
    SEND_FRIEND_REQUEST_REQUEST,
    SEND_FRIEND_REQUEST_SUCCESS,
    SEND_FRIEND_REQUEST_FAILURE,
    ACCEPT_FRIEND_REQUEST_REQUEST,
    ACCEPT_FRIEND_REQUEST_SUCCESS,
    ACCEPT_FRIEND_REQUEST_FAILURE,
    CLEAR_ERRORS,
    FETCH_CHAT_DETAILS_REQUEST,
    FETCH_CHAT_DETAILS_SUCCESS,
    FETCH_CHAT_DETAILS_FAILURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    SEND_ATTACHMENT_REQUEST,
    SEND_ATTACHMENT_SUCCESS,
    SEND_ATTACHMENT_FAILURE,
    NEW_MESSAGE_ALERT,
    RESET_MESSAGE_ALERT,
    REMOVE_ALERT_MESSAGE,
    FETCH_MY_GROUPS_REQUEST,
    FETCH_MY_GROUPS_SUCCESS,
    FETCH_MY_GROUPS_FAILURE
} from '../constant/chatConstant';

const initialState = {
    loading: false,
    chats: [],
    error: null,
    message: '',
    senderId: null,
};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHATS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CHATS_SUCCESS:
            return {
                ...state,
                loading: false,
                chats: action.payload,
            };
        case FETCH_CHATS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const friendRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_FRIEND_REQUEST_REQUEST:
        case ACCEPT_FRIEND_REQUEST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SEND_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case ACCEPT_FRIEND_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                senderId: action.payload.senderId,
            };
        case SEND_FRIEND_REQUEST_FAILURE:
        case ACCEPT_FRIEND_REQUEST_FAILURE:
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

export const chatDetailsReducer = (state = { chat: {} }, action) => {
    switch (action.type) {
        case FETCH_CHAT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_CHAT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                chat: action.payload,
            };
        case FETCH_CHAT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const messageReducer = (state = { messages: [],  groups: [], }, action) => {
    switch (action.type) {
      case FETCH_MESSAGES_REQUEST:
      case FETCH_MY_GROUPS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_MESSAGES_SUCCESS:
        return {
          ...state,
          loading: false,
          messages: action.payload.messages,
          totalMessages: action.payload.totalMessage,
        };
        case FETCH_MY_GROUPS_SUCCESS:
          return {
            ...state,
            loading: false,
            groups: action.payload
          };
      case FETCH_MESSAGES_FAILURE:
      case FETCH_MY_GROUPS_FAILURE:
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

export const attachmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_ATTACHMENT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case SEND_ATTACHMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case SEND_ATTACHMENT_FAILURE:
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


 export const messageAlertReducer = (state = initialState, action) => {
    switch (action.type) {
      case NEW_MESSAGE_ALERT: {
        const { chatId, message } = action.payload;
        return {
          ...state,
          [chatId]: {
            ...(state[chatId] || { count: 0, latestMessage: null }),
            count: (state[chatId]?.count || 0) + 1,
            latestMessage: message,
          },
        };
      }
  
      case RESET_MESSAGE_ALERT: {
        const { chatId } = action.payload;
        return {
          ...state,
          [chatId]: {
            count: 0,
            latestMessage: null,
          },
        };
      }
  
      case REMOVE_ALERT_MESSAGE: {
        const { chatId } = action.payload;
        const newState = { ...state };
        delete newState[chatId];
        return newState;
      }
  
      default:
        return state;
    }
  };
  

  




