import {
  SET_REQUEST_STATUS,
  RECEIVE_POSTS,
  SET_ERROR_STATUS
} from '../constants';

const setRequestStatus = (isFetching) => ({
  type: SET_REQUEST_STATUS,
  isFetching
});

const receivePosts = (json) => ({
  type: RECEIVE_POSTS,
  stocks: json.securities.data.map(child => child)
});

const setErrorStatus = (isError) => ({
  type: SET_ERROR_STATUS,
  isError
});

export const fetchData = () => dispatch => {
  dispatch(setRequestStatus(true));
  fetch(`http://iss.moex.com/iss/engines/stock/markets/shares/securities.json`)
    .then(response => {
      // console.log(response)
      dispatch(setRequestStatus(false));
      dispatch(setErrorStatus(false));
      return response.json();
    })
    .then(json => {
      // console.log(json)
      dispatch(receivePosts(json));
    })
    .catch((error) => {
      dispatch(setErrorStatus(true))
      console.log(error)
    })
}
