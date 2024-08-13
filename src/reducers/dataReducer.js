import { produce } from 'immer'; // Use named import

import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from '../actions/dataActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
  dataSource: 'live'
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return produce(state, draft => {
        draft.data = action.payload;
        draft.error = null;
      });
    case FETCH_DATA_FAILURE:
      return produce(state, draft => {
        draft.error = action.payload; // error should be an object with message, type, and stack
      });
    default:
      return state;
  }
};

export default dataReducer;
