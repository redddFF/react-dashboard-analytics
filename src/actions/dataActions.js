export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: {
    message: error.message || 'An error occurred',
    type: error.type || 'Unknown error',
    stack: error.stack || 'No stack trace available'
  }
});

// Example WebSocket action
export const connectWebSocket = () => (dispatch) => {
  const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      dispatch(fetchDataSuccess(data)); // Ensure data is not mutated
    } catch (error) {
      dispatch(fetchDataFailure({
        message: error.message,
        stack: error.stack
      }));
    }
  };

  ws.onerror = (event) => {
    dispatch(fetchDataFailure({
      message: event.message || 'WebSocket error',
      type: event.type
    }));
  };

  return () => ws.close(); // Clean up the WebSocket connection
};
