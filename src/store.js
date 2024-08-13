import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';  // Make sure this path is correct

const store = configureStore({
  reducer: rootReducer,
});

export default store;
