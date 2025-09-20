import { Route, Routes } from 'react-router-dom'
import Login from './pages/authentication/Login'
import Registration from './pages/authentication/Registration'
import Forgot from './pages/authentication/Forgot'
import Dashboard from './pages/dashboard/Dashboard'
import Student from './pages/student/Student'
import Staff from './pages/staff/Staff'
import Attendance from './pages/attendance/Attendance'
import Reports from './pages/reports/Reports'
import Asset from './pages/asset/Asset'
import Grocery from './pages/grocery/Grocery'
import Inventory from './pages/inventory/Inventory'
import User from './pages/user/User'
import Activities from './pages/activities/Activities'
import Schools from './pages/schools/Schools'
import Suppliers from './pages/suppliers/Suppliers'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/student" element={<Student />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/asset" element={<Asset />} />
      <Route path="/grocery" element={<Grocery />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/user" element={<User />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/schools" element={<Schools />} />
      <Route path="/suppliers" element={<Suppliers />} />
    </Routes>
  )
}

export default AppRoutes
