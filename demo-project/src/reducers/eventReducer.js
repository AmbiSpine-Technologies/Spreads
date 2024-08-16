// src/redux/event/eventReducer.js
import { CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_EVENTS_FAILURE,
    GET_EVENT_BY_ID_REQUEST,
    GET_EVENT_BY_ID_SUCCESS,
    GET_EVENT_BY_ID_FAILURE,
    GET_USER_EVENTS_REQUEST,
    GET_USER_EVENTS_SUCCESS,
    GET_USER_EVENTS_FAILURE,
 } from './eventActionTypes';

const initialState = {
  loading: false,
  event: null,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_EVENT_SUCCESS:
      return { ...state, loading: false, event: action.payload };
    case CREATE_EVENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case GET_EVENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_EVENTS_SUCCESS:
        return { ...state, loading: false, events: action.payload };
      case GET_EVENTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
        
      case GET_EVENT_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_EVENT_BY_ID_SUCCESS:
        return { ...state, loading: false, event: action.payload };
      case GET_EVENT_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      case GET_USER_EVENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_USER_EVENTS_SUCCESS:
        return { ...state, loading: false, userEvents: action.payload };
      case GET_USER_EVENTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default eventReducer;
