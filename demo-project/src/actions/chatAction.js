import { CLEAR_ERRORS, FETCH_CHATS_FAILURE, FETCH_CHATS_REQUEST, FETCH_CHATS_SUCCESS,
    SEND_FRIEND_REQUEST_REQUEST,
    SEND_FRIEND_REQUEST_SUCCESS,
    SEND_FRIEND_REQUEST_FAILURE,
    ACCEPT_FRIEND_REQUEST_REQUEST,
    ACCEPT_FRIEND_REQUEST_SUCCESS,
    ACCEPT_FRIEND_REQUEST_FAILURE,
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
 } from "../constant/chatConstant.js";
import axiosInstance from "../utlis/axios.js"; 
import { toast } from 'react-toastify';
// Action Creators
export const fetchChatsRequest = () => ({
    type: FETCH_CHATS_REQUEST,
});

export const fetchChatsSuccess = (chats) => ({
    type: FETCH_CHATS_SUCCESS,
    payload: chats,
});

export const fetchChatsFailure = (error) => ({
    type: FETCH_CHATS_FAILURE,
    payload: error,
});

export const fetchChats = () => async (dispatch) => {
    dispatch(fetchChatsRequest());
    try {
        const { data } = await axiosInstance.get('/chat/myChat');
        dispatch(fetchChatsSuccess(data.chats));
    } catch (error) {
        dispatch(fetchChatsFailure(error.response?.data?.message || error.message));
    }
};

export const fetchChatDetails = ({ id, populate = false }) => async (dispatch) => {
    dispatch({ type: FETCH_CHAT_DETAILS_REQUEST });
    try {
        let url = `/chat/${id}`;
        if (populate) url += "?populate=true";
        
        const { data } = await axiosInstance.get(url); // Use the updated `url` here
        
        dispatch({
            type: FETCH_CHAT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FETCH_CHAT_DETAILS_FAILURE,
            payload: error.response ? error.response.data.message : error.message
        });
    }
};

export const sendAttachment = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SEND_ATTACHMENT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    };

    const { data } = await axiosInstance.post('/chat/send-attachment', formData, config);

    dispatch({
      type: SEND_ATTACHMENT_SUCCESS,
      payload: data.message,
    });

    toast.success('Attachment sent successfully');
  } catch (error) {
    dispatch({
      type: SEND_ATTACHMENT_FAILURE,
      payload: error.response.data.message || error.message,
    });

    toast.error(error.response.data.message || 'Failed to send attachment');
  }
};
  

export const sendFriendRequest = (userId) => async (dispatch) => {
    dispatch({ type: SEND_FRIEND_REQUEST_REQUEST });
    
    try {
        const { data } = await axiosInstance.put('user/sendrequest', { userId });
        
        dispatch({
            type: SEND_FRIEND_REQUEST_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: SEND_FRIEND_REQUEST_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};



export const acceptFriendRequest = (requestId, accept) => async (dispatch) => {
    dispatch({ type: ACCEPT_FRIEND_REQUEST_REQUEST });

    try {
        const { data } = await axiosInstance.put('user/acceptrequest', { requestId, accept });

        dispatch({
            type: ACCEPT_FRIEND_REQUEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ACCEPT_FRIEND_REQUEST_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const fetchMessages = (chatId, page ) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_MESSAGES_REQUEST });
  
      const { data } = await axiosInstance.get(`/chat/message/${chatId}`, { page });
  
      dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_MESSAGES_FAILURE,
        payload: error.response.data.message,
      });
    }
  };


export const newMessageAlert = (chatId, message) => ({
  type: NEW_MESSAGE_ALERT,
  payload: { chatId, message }
});

export const removeAlertMessage = (chatId) => ({
  type: REMOVE_ALERT_MESSAGE,
  payload: { chatId },
});


export const resetMessageAlert = (chatId) => ({
  type: RESET_MESSAGE_ALERT,
  payload: { chatId }
});

export const fetchMyGroups = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_MY_GROUPS_REQUEST });

    const response = await axiosInstance.get('/chat/mygroup');
    const { groups } = response.data;

    dispatch({
      type: FETCH_MY_GROUPS_SUCCESS,
      payload: groups
    });
  } catch (error) {
    dispatch({
      type: FETCH_MY_GROUPS_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
  };