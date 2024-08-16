// src/redux/event/eventActions.js
import axios from 'axios';
import { CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE } from './eventActionTypes';

// Action creator for creating a new event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EVENT_REQUEST });

    const response = await axios.post('/api/events/new', eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        
      },
    });

    dispatch({
      type: CREATE_EVENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_EVENT_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getAllEvents = () => async (dispatch) => {
    try {
      dispatch({ type: GET_EVENTS_REQUEST });
  
      const response = await axios.get('/api/events');
  
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENTS_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
  
  // Action creator for fetching a specific event by ID
  export const getEventById = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_EVENT_BY_ID_REQUEST });
  
      const response = await axios.get(`/api/events/${id}`);
  
      dispatch({
        type: GET_EVENT_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_EVENT_BY_ID_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
  
  // Action creator for fetching events for a specific user
  export const getUserEvents = (userId) => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_EVENTS_REQUEST });
  
      const response = await axios.get(`/api/events/user/${userId}`);
  
      dispatch({
        type: GET_USER_EVENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_EVENTS_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
