import { configureStore } from '@reduxjs/toolkit';
import { studentReducer } from './Student/StudentReducer';
import { assetsReducer } from './Assets/AssetsReducer';
import { inventoryReducer } from './Inventory/InventoryReducer';
import { staffReducer } from './Staff/StaffReducer';
import { loginReducer } from './Login/LoginReducer';
import { supplierReducer } from './Suppliers/SuppliersReducer';

// Create the store
const store = configureStore({
  reducer: {
    login: loginReducer,
    student: studentReducer,
    asset: assetsReducer,
    inventory: inventoryReducer,
    staff: staffReducer,
    supplier: supplierReducer,
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
