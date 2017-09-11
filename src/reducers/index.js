import { combineReducers } from 'redux';
import {
  SET_ERROR_STATUS,
  SET_REQUEST_STATUS,
  RECEIVE_STOCKS,
  RECEIVE_SINGLE_STOCK
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
    case RECEIVE_STOCKS:
      return action.stocks;
    default:
      return state;
  }
}

const stock = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SINGLE_STOCK:
      return action.stock;
    default:
      return state;
  }
}

const reducer = combineReducers({
  isError,
  isFetching,
  stocks,
  stock
});

export default reducer;
