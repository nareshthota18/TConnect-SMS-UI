import { configureStore } from '@reduxjs/toolkit';
import { studentReducer } from './Student/StudentReducer';

// Create the store
const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});

// ✅ Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
