import { configureStore } from '@reduxjs/toolkit';
import { studentReducer } from './Student/StudentReducer';
import { assetsReducer } from './Assets/AssetsReducer';
import { inventoryReducer } from './Inventory/InventoryReducer';
import { staffReducer } from './Staff/StaffReducer';
import { loginReducer } from './Login/LoginReducer';
import { supplierReducer } from './Suppliers/SuppliersReducer';
import { attendanceStudentReducer } from './Attendance/AttendanceReducer';
import { userReducer } from './Users/UserReducer';
import { rolesReducer } from './Roles/RoleReducer';

// Create the store
const store = configureStore({
  reducer: {
    login: loginReducer,
    student: studentReducer,
    asset: assetsReducer,
    inventory: inventoryReducer,
    staff: staffReducer,
    supplier: supplierReducer,
    attendanceStudent: attendanceStudentReducer,
    user: userReducer,
    roles: rolesReducer,
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
