import {
  SET_REQUEST_STATUS,
  RECEIVE_STOCKS,
  RECEIVE_SINGLE_STOCK,
  SET_ERROR_STATUS
} from '../constants';

const setRequestStatus = (isFetching) => ({
  type: SET_REQUEST_STATUS,
  isFetching
});

const receiveStocks = (json) => ({
  type: RECEIVE_STOCKS,
  stocks: json.securities.data.map(child => child)
});

const setErrorStatus = (isError) => ({
  type: SET_ERROR_STATUS,
  isError
});

export const fetchData = () => dispatch => {
  dispatch(setRequestStatus(true));
  fetch(`https://iss.moex.com/iss/engines/stock/markets/shares/securities.json`)
    .then(response => {
      dispatch(setRequestStatus(false));
      dispatch(setErrorStatus(false));
      return response.json();
    })
    .then(json => {
      dispatch(receiveStocks(json));
    })
    .catch((error) => {
      dispatch(setErrorStatus(true))
      console.log(error)
    })
}

//*******************************************************************************************

const receiveSingleStock = (json) => ({
  type: RECEIVE_SINGLE_STOCK,
  stock: json.securities.data[0]
});

export const fetchSingleStock = (stockName) => dispatch => {
  fetch(`https://iss.moex.com/iss/engines/stock/markets/shares/securities/${stockName}.json`)
  .then(response => {
    dispatch(setErrorStatus(false));
    return response.json();
  })
  .then(json => {
    dispatch(receiveSingleStock(json));
  })
  .catch((error) => {
    dispatch(setErrorStatus(true))
    console.log(error)
  })
}
