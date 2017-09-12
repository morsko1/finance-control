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
  stocks: json.map(child => child)
});

const setErrorStatus = (isError) => ({
  type: SET_ERROR_STATUS,
  isError
});

export const fetchData = () => dispatch => {
  dispatch(setRequestStatus(true));
  fetch(`https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities.json?iss.meta=off&iss.only=securities`)
    .then(response => {
      dispatch(setRequestStatus(false));
      dispatch(setErrorStatus(false));
      return response.json();
    })
    .then(json => {
      dispatch(receiveStocks(json.securities.data));
    })
    .catch((error) => {
      dispatch(setErrorStatus(true))
      console.log(error)
    })
}

//*******************************************************************************************

const receiveSingleStock = (json) => ({
  type: RECEIVE_SINGLE_STOCK,
  stock: json
});

export const fetchSingleStock = (stockName) => dispatch => {
  fetch(`https://iss.moex.com/iss/engines/stock/markets/shares/boards/tqbr/securities/${stockName}.json?iss.meta=off`)
  .then(response => {
    dispatch(setErrorStatus(false));
    return response.json();
  })
  .then(json => {
    dispatch(receiveSingleStock(json.securities.data[0]));
  })
  .catch((error) => {
    dispatch(setErrorStatus(true))
    console.log(error)
  })
}
