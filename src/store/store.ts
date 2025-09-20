import { configureStore } from '@reduxjs/toolkit';
import { studentReducer } from './Student/StudentReducer';
import { assetsReducer } from './Assets/AssetsReducer';
import { inventoryReducer } from './Inventory/InventoryReducer';
import { staffReducer } from './Staff/StaffReducer';

// Create the store
const store = configureStore({
  reducer: {
    student: studentReducer,
    asset: assetsReducer,
    inventory: inventoryReducer,
    staff: staffReducer,
  },
});

// ✅ Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
