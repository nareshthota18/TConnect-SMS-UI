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
import { schoolsReducer } from './Schools/SchoolsReducer';
import { departmentsReducer } from './Dropdowns/DropdownReducer';
import { holidayReducer } from './Holidays/HolidaysReducer';
import { activityReducer } from './Activities/ActivitiesReducer';
import { groceryConsumptionReducer } from './Grocery/GroceryReducer';

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
    schools: schoolsReducer,
    departments: departmentsReducer,
    holidays: holidayReducer,
    activity: activityReducer,
    grocery: groceryConsumptionReducer,
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
