import { Route, Routes } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";
import Forgot from "./pages/authentication/Forgot";
import Dashboard from "./pages/dashboard/Dashboard";
import Student from "./pages/student/Student";
import Staff from "./pages/staff/Staff";
import Attendance from "./pages/attendance/Attendance";
import Reports from "./pages/reports/Reports";
import Asset from "./pages/asset/Asset";
import Grocery from "./pages/grocery/Grocery";
import Inventory from "./pages/inventory/Inventory";
import User from "./pages/user/User";
import Activities from "./pages/activities/Activities";
import Schools from "./pages/schools/Schools";
import Suppliers from "./pages/suppliers/Suppliers";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import LookUp from "./pages/lookup/LookUp";
import Holidays from "./pages/holidays/Holidays";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot" element={<Forgot />} />

      {/* Common routes (accessible by all logged-in roles) */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/student" element={<Student />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/holidays" element={<Holidays />} />

      {/* Admin & SuperAdmin only */}
      <Route element={<ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]} />}>
        <Route path="/staff" element={<Staff />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/asset" element={<Asset />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/user" element={<User />} />
      </Route>

      {/* SuperAdmin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={["SuperAdmin"]} />}>
        <Route path="/schools" element={<Schools />} />
        <Route path="/lookup" element={<LookUp />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
