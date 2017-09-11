import { combineReducers } from 'redux';
import {
  SET_ERROR_STATUS,
  SET_REQUEST_STATUS,
  RECEIVE_POSTS
} from '../constants';

const isError = (state = false, action) => {
  switch (action.type) {
    case SET_ERROR_STATUS:
      return action.isError;
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case SET_REQUEST_STATUS:
      return action.isFetching;
    default:
      return state;
  }
}

const stocks = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.stocks;
    default:
      return state;
  }
}

const reducer = combineReducers({
  isError,
  isFetching,
  stocks
});

export default reducer;
